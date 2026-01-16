import { Request, Response } from 'express'

export class DeliveriesController {
  async create(req: Request, res: Response) {
    return res.status(201).json({ message: 'Delivery created' })
  }
}
