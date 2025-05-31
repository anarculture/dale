import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_req, res) => {
  const trips = await prisma.trip.findMany();
  res.json(trips);
});

router.post('/', async (req, res) => {
  const userId = Number(req.auth?.claims?.sub);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { origin, destination, date, availableSeats, price } = req.body;

  try {
    const trip = await prisma.trip.create({
      data: {
        driverId: userId,
        origin,
        destination,
        date: new Date(date),
        availableSeats: Number(availableSeats),
        price: Number(price),
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error('Trip creation failed:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

export default router;
