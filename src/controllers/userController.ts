import { Request, Response } from 'express'
import { z } from 'zod'
import { userService } from '../services/userService'


const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 letras'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})


export const userController = {
  async create(req: Request, res: Response) {
    try {
      const data = userSchema.parse(req.body)
      const newUser = await userService.createUser(data)
      return res.status(201).json(newUser)
    } catch (error: any) {

      console.error('🔴 ERRO NO CADASTRO:', error)

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors })
      }
      if (error.message === 'Este e-mail já está cadastrado.') {
        return res.status(409).json({ error: error.message })
      }
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  },
}
