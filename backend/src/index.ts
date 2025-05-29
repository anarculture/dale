// backend/src/index.ts
import { Request, Response } from 'express'
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Routers
const authRouter = require('./routes/auth')
const tripsRouter = require('./routes/trips')

// 1) Log de arranque
console.log('🚀 Iniciando backend de Dale...')

// 2) Rutas de autenticación
console.log('🔐 Montando auth routes en /api/auth')
app.use('/api/auth', authRouter)

// 3) Rutas de viajes
console.log('🚗 Montando trips routes en /api/trips')
app.use('/api/trips', tripsRouter)

// 4) Sanity check público
app.get('/api/ping', (_req: Request, res: Response) => {
  res.json({ message: 'pong' })
})

// 5) Levantar servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🖥️  Server escuchando en http://localhost:${PORT}`)
})
