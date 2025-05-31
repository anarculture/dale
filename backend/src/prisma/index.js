// backend/src/index.ts
import express, { Request, Response } from 'express'
import cors from 'cors'
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

console.log('🚀 Iniciando backend de Dale...')

// Auth
import authRouter from './routes/auth'
console.log('🔐 Montando auth routes en /api/auth')
app.use('/api/auth', authRouter)

