// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth';
import tripRoutes from './routes/trips';
import { betterAuth } from 'better-auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

// ✅ BetterAuth middleware: use the default import and call `.express()`
// If betterAuth does not require any options, use it without arguments:
app.use(
  betterAuth({}).handler // Pass an empty options object as required
);

// If you need to pass options, replace with the correct property names as per better-auth documentation.

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
