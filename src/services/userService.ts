import bcrypt from 'bcrypt'
import { db } from '../database/connection'

export const userService = {
  async createUser(data: any) {
    const userExists = await db('users').where({ email: data.email }).first()
    if (userExists) {
      throw new Error('Este e-mail já está cadastrado.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const [id] = await db('users').insert({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    })

    return { id, name: data.name, email: data.email }
  },
}
