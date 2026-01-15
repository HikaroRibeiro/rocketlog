/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { passCrypto } from '@/utils/pass-crypto'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/app-error'

export class UsersController {
  async create(req: Request, res: Response, _next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().min(2),
      email: z.email(),
      password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(req.body)

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new AppError('Email already registered', 409)
    }

    const passwordEncrypted = await passCrypto(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordEncrypted,
      },
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(201).json(userWithoutPassword)
  }
  // Controller methods will be implemented here
}
