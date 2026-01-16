import { authConfig } from '@/configs/auth-config'
import { AppError } from '@/utils/app-error'
import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface ITokenPayLoad {
  sub: string
  role: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id, role } = verify(
      token,
      authConfig.jwt.secret,
    ) as ITokenPayLoad

    request.user = {
      id: user_id,
      role,
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}

export { ensureAuthenticated }
