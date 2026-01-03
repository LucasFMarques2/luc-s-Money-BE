import { Request, Response } from 'express'
import { z } from 'zod'
import { transactionService } from '../services/transactionService'

const transactionSchema = z.object({
  categoryId: z.number(),
  description: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  installments: z.number().optional().default(1),
  isPaid: z.boolean().optional().default(false),
})

// Schema parcial para atualizações (tudo opcional)
const updateTransactionSchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  dueDate: z.string().optional(),
  categoryId: z.number().optional(),
  isPaid: z.boolean().optional(), // O front envia true/false
})

export const transactionController = {
  async create(req: Request, res: Response) {
    try {
      const data = transactionSchema.parse(req.body)
      const userId = req.userId!
      const result = await transactionService.create({ ...data, userId })
      return res.status(201).json(result)
    } catch (error: any) {
      return res.status(400).json({ error: error.errors || error.message })
    }
  },

  async list(req: Request, res: Response) {
    const userId = req.userId!
    const { month, year } = req.query

    const list = await transactionService.list(
      userId,
      month ? Number(month) : undefined,
      year ? Number(year) : undefined
    )

    return res.json(list)
  },

  // Novo método UPDATE
  async update(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { id } = req.params
      const data = updateTransactionSchema.parse(req.body)

      await transactionService.update(Number(id), userId, data)

      return res.status(204).send()
    } catch (error: any) {
      return res.status(400).json({ error: error.errors || error.message })
    }
  },

  async delete(req: Request, res: Response) {
    const userId = req.userId!
    const { id } = req.params
    await transactionService.delete(Number(id), userId)
    return res.status(204).send()
  },
}
