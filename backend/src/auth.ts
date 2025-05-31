// src/auth.ts

import { BetterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma-adapter';
import { db } from './prisma';

export const auth = BetterAuth({
  adapter: prismaAdapter(db, {
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
  }),
  // You can add more options here (like email config, etc.)
});
