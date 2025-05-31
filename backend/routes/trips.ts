import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

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
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

router.post('/', async (req, res) => {
  if (!req.auth?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { origin, destination, date, availableSeats, price } = req.body;

  try {
    const trip = await prisma.trip.create({
      data: {
        driverId: req.auth.user.id,
        origin,
        destination,
        date: new Date(date),
        availableSeats,
        price,
      },
    });
    res.status(201).json(trip);
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ error: 'Error creating trip' });
  }
});

export default router;
