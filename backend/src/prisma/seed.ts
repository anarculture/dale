import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const mockDriverId = 1;

  await prisma.trip.createMany({
    data: [
      {
        driverId: mockDriverId,
        origin: 'Downtown',
        destination: 'Airport',
        date: new Date(Date.now() + 86400000),
        availableSeats: 3,
        price: 25.5,
      },
      {
        driverId: mockDriverId,
        origin: 'Uptown',
        destination: 'Central Park',
        date: new Date(Date.now() + 2 * 86400000),
        availableSeats: 2,
        price: 15.0,
      },
    ],
  });

  console.log('✅ Trips seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });