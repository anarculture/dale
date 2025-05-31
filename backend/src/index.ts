// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth';
import tripRoutes from './routes/trips';
import { betterAuth } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/utils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

// ✅ BetterAuth handler (Express integration)
app.all('/api/auth/*', async (req, res) => {
  const request = new Request(`http://localhost${req.url}`, {
    method: req.method,
    headers: fromNodeHeaders(req.headers),
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  const response = await betterAuth({}).handler(request);
  const responseBody = await response.text();

  res.status(response.status);
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.send(responseBody);
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (_req, res) => {
  res.send('RideShare API is running');
});

// ✅ Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ✅ Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
