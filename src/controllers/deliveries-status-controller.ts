import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '@/database/prisma'

export class DeliveriesStatusController {
  async update(req: Request, res: Response) {
    const parmsSchema = z.object({
      id: z.uuid(),
    })

    const bodySchema = z.object({
      status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']),
    })

    const { id } = parmsSchema.parse(req.params)
    const { status } = bodySchema.parse(req.body)

    await prisma.delivery.update({
      where: { id },
      data: { status },
    })

    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: `Status updated to ${status}`,
      },
    })

    return res.status(200).json({ message: 'Delivery status updated' })
  }
}
