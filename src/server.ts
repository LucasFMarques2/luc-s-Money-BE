import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { userRoutes } from './routes/userRoutes'
import { authRoutes } from './routes/authRoutes'
import { transactionRoutes } from './routes/transactionRoutes'


const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/transactions', transactionRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API de Finanças está rodando! 🚀' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
})
