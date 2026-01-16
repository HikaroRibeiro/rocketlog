/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { prisma } from '@/database/prisma'
import { z } from 'zod'
import { AppError } from '@/utils/app-error'
import { compareSync } from 'bcrypt'
import { authConfig } from '@/configs/auth-config'
import { sign } from 'jsonwebtoken'

export class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    })

    const { email, password } = bodySchema.parse(req.body)

    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = compareSync(password, user.password)

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role ?? 'customer' }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: hashedPassword, ...userWithoutPassword } = user

    return res.status(201).json({ token, user: userWithoutPassword })
  }
}
