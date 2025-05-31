// src/prisma/index.ts

import { PrismaClient } from '@prisma/client';

// Optional: add logging or custom config if needed
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export default prisma;
