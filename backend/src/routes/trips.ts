// backend/src/routes/trips.ts
import express, { Request } from 'express';
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

// Extiende la interfaz Request para incluir userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();
const prisma = new PrismaClient();

// Listar viajes
router.get('/', async (req, res) => {
  const { origin, destination, date } = req.query;
  const where: any = {};
    if (origin) where.origin = String(origin);
    if (destination) where.destination = String(destination);
    if (date) where.date = new Date(String(date));

    try {
      const trips = await prisma.trip.findMany({ where });
      res.json(trips);
    } catch (err) {
      console.error('Error fetching trips:', err);
      res.status(500).json({ error: 'Error interno al listar viajes.' });
    }
  });

router.post('/', authenticate, async (req: AuthenticatedRequest, res) => {
  const { origin, destination, date, availableSeats, price } = req.body;
  if (!origin || !destination || !date || !availableSeats || !price) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  const trip = await prisma.trip.create({
    data: {
      driverId: req.userId,
      origin,
      destination,
      date: new Date(date),
      availableSeats: Number(availableSeats),
      price: Number(price),
    }
  });
  res.status(201).json(trip);
});
// Reserva de asiento en un viaje (conductor no puede reservar su propio viaje)
router.post('/:id/reserve', authenticate, async (req: AuthenticatedRequest, res) => {
  const tripId = Number(req.params.id);
  const passengerId = req.userId ? Number(req.userId) : undefined;

  try {
    const reservation = await prisma.$transaction(async (tx: { trip: { findUnique: (arg0: { where: { id: number; }; select: { availableSeats: boolean; driverId: boolean; }; }) => any; update: (arg0: { where: { id: number; }; data: { availableSeats: { decrement: number; }; }; }) => any; }; reservation: { create: (arg0: { data: { tripId: number; passengerId: number | undefined; }; }) => any; }; }) => {
      // 1) Compruebo que existe el viaje y hay asientos
      const trip = await tx.trip.findUnique({
        where: { id: tripId },
        select: { availableSeats: true, driverId: true }
      });
      if (!trip) {
        throw { status: 404, message: 'Viaje no encontrado.' };
      }
      if (trip.driverId === passengerId) {
        throw { status: 400, message: 'No puedes reservar tu propio viaje.' };
      }
      if (trip.availableSeats < 1) {
        throw { status: 400, message: 'No quedan asientos disponibles.' };
      }

      // 2) Creo la reserva
      const newRes = await tx.reservation.create({
        data: { tripId, passengerId }
      });

      // 3) Decremento el contador de asientos
      await tx.trip.update({
        where: { id: tripId },
        data: { availableSeats: { decrement: 1 } }
      });

      return newRes;
    });

    // Devuelvo la reserva creada
    return res.status(201).json(reservation);
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('Error en reserve:', err);
    return res.status(500).json({ error: 'Error interno al reservar.' });
  }
});

module.exports = router;
