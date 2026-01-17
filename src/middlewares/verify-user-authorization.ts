import { AppError } from '@/utils/app-error'
import { NextFunction, Request, Response } from 'express'

export function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('User information is missing in the request', 401)
    }
    if (!role.includes(req.user.role)) {
      throw new AppError('User does not have the required authorization', 403)
    }
    next()
  }
}
