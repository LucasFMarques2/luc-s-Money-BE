import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../database/connection'

export const authService = {
  async login(email: string, password: string) {
    const user = await db('users').where({ email }).first()

    if (!user) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const secret = process.env.JWT_SECRET || 'secredo_padrao'
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' })

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    }
  },
}
