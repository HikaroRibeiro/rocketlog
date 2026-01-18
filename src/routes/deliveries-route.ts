import { DeliveriesController } from '@/controllers/deliveries-controller'
import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization'
import { DeliveriesStatusController } from '@/controllers/deliveries-status-controller'

const deliveriesRouter = Router()
const deliveriesController = new DeliveriesController()
const deliveriesStatusController = new DeliveriesStatusController()

deliveriesRouter.use(ensureAuthenticated, verifyUserAuthorization(['admin']))

deliveriesRouter.post('/', deliveriesController.create)
deliveriesRouter.get('/', deliveriesController.index)
deliveriesRouter.patch('/:id/status', deliveriesStatusController.update)

export { deliveriesRouter }
