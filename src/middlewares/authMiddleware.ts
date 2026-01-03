import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: number
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const parts = authorization.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' })
  }

  const [schema, token] = parts

  if (schema !== 'Bearer') {
    return res.status(401).json({ error: 'Token mal formatado' })
  }

  try {
    const secret = process.env.JWT_SECRET || 'secredo_padrao'
    const decoded = jwt.verify(token, secret) as { id: number }

    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
