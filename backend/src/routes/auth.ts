// backend/src/routes/auth.ts
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'cambiame_por_entorno';

// Registro
router.post('/register', async (req: { body: { name: any; email: any; password: any; phone: any; isDriver: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: { user: { id: any; name: any; email: any; phone: any; isDriver: any; }; token: any; }) => any; }) => {
  const { name, email, password, phone, isDriver } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email ya registrado.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone, isDriver }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      user: { id: user.id, name: user.name, email: user.email, phone, isDriver },
      token
    });
  } catch (err) {
    console.error('Error en /auth/register:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Login
router.post('/login', async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: { user: { id: any; name: any; email: any; phone: any; isDriver: any; }; token: any; }) => any; }) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son obligatorios.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Credenciales inválidas.' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, isDriver: user.isDriver },
      token
    });
  } catch (err) {
    console.error('Error en /auth/login:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
