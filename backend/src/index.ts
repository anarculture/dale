// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth'; // you must define this auth object per Better Auth setup

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Mount BetterAuth first (before express.json)
app.all('/api/auth/*', toNodeHandler(auth));

// ✅ Then other middlewares and routes
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('RideShare API is running');
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
