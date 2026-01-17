import { DeliveriesController } from '@/controllers/deliveries-controller'
import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization'

const deliveriesRouter = Router()
const deliveriesController = new DeliveriesController()

deliveriesRouter.post(
  '/',
  ensureAuthenticated,
  verifyUserAuthorization(['sales', 'admin']),
  deliveriesController.create,
)
deliveriesRouter.get(
  '/',
  ensureAuthenticated,
  verifyUserAuthorization(['sales', 'admin', 'customer']),
  deliveriesController.index,
)
export { deliveriesRouter }
