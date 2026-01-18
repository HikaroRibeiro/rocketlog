import { Request, Response } from 'express'
import { prisma } from '@/database/prisma'
import { z } from 'zod'
import { AppError } from '@/utils/app-error'

export class DeliveriesLogsController {
  async index(req: Request, res: Response) {
    const parmsSchema = z.object({
      delivery_id: z.uuid(),
    })

    const { delivery_id } = parmsSchema.parse(req.params)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        deliveryLogs: { select: { description: true } },
        user: { select: { name: true, email: true } },
      },
    })

    const { role } = req.user!

    if (role !== 'admin' && delivery?.userId !== req.user!.id) {
      throw new AppError(
        'Unauthorized, user can be access your own delivery',
        403,
      )
    }

    if (!delivery) {
      throw new AppError('Delivery not found')
    }

    return res.status(200).json(delivery)
  }

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      delivery_id: z.uuid(),
      description: z.string().min(5),
    })

    const { delivery_id, description } = bodySchema.parse(req.body)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    })

    if (!delivery) {
      throw new AppError('Delivery not found')
    }

    if (delivery.status === 'delivered') {
      throw new AppError('Cannot add log to a delivered delivery', 400)
    }

    if (delivery.status === 'pending') {
      throw new AppError('Cannot add log to a pending delivery')
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    })

    return res.status(201).json({ message: 'Delivery log created' })
  }
}
