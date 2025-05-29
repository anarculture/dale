// backend/src/index.ts
import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Lo primero: un log para comprobar que este fichero se ejecuta
console.log('🚀 Iniciando backend de Dale...');

// Montamos las rutas de autenticación
console.log('🔐 Montando auth routes en /api/auth');
app.use('/api/auth', authRouter);

// Un endpoint público de sanity check
app.get('/api/ping', (_req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

// Asegúrate de montar tus otros routers **DESPUÉS** de auth
// const tripsRouter = require('./routes/trips');
// app.use('/api/trips', tripsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🖥️  Server escuchando en http://localhost:${PORT}`);
});
