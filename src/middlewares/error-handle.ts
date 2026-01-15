/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

function errorHandle(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    console.log('App Error detected')
    return res.status(error.statusCode).json({
      errors: error.message,
    })
  }

  if (error instanceof ZodError) {
    console.log('Zod Error detected')
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      issues: z.prettifyError(error),
    })
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  })
}

export { errorHandle }
