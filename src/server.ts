import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoutes } from './routes/authRoutes'
import { transactionRoutes } from './routes/transactionRoutes'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/transactions', transactionRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'API FinTrack rodando com sucesso!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
