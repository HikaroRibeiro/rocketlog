import { Request, Response } from 'express'
import { prisma } from '@/database/prisma'
import { z } from 'zod'

export class DeliveriesController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.uuid(),
      description: z.string().min(5),
    })

    const { user_id, description } = bodySchema.parse(req.body)

    await prisma.delivery.create({
      data: {
        description,
        userId: user_id,
      },
    })

    return res.status(201).json({ message: 'Delivery created' })
  }

  async index(req: Request, res: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: { user: { select: { name: true, email: true } } },
    })
    return res.status(200).json(deliveries)
  }
}
