import { DeliveriesController } from '@/controllers/deliveries-controller'
import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'

const deliveriesRouter = Router()
const deliveriesController = new DeliveriesController()

deliveriesRouter.post('/', ensureAuthenticated, deliveriesController.create)

export { deliveriesRouter }
