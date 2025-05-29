// backend/src/routes/trips.ts
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/trips?origin=&destination=&date=
router.get('/', async (req, res) => {
  const { origin, destination, date } = req.query
  try {
    const trips = await prisma.trip.findMany({
      where: {
        ...(origin && { origin: String(origin) }),
        ...(destination && { destination: String(destination) }),
        ...(date && { date: new Date(String(date)) }),
      }
    })
    return res.json(trips)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error fetching trips' })
  }
})

export default router
