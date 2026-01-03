import { Request, Response } from 'express'
import { z } from 'zod'
import { authService } from '../services/authService'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body)

      const result = await authService.login(email, password)

      return res.json(result)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors })
      }
      return res.status(401).json({ error: 'E-mail ou senha inválidos' })
    }
  },
}
