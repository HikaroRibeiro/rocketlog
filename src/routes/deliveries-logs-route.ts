import { Router } from 'express'
import { DeliveriesLogsController } from '@/controllers/deliveries-logs-controller'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization'

const deliveriesLogsRouter = Router()
const deliveriesLogsController = new DeliveriesLogsController()

deliveriesLogsRouter.get(
  '/:delivery_id/show',
  ensureAuthenticated,
  verifyUserAuthorization(['admin', 'customer']),
  deliveriesLogsController.index,
)
deliveriesLogsRouter.post(
  '/',
  ensureAuthenticated,
  verifyUserAuthorization(['admin']),
  deliveriesLogsController.create,
)

export { deliveriesLogsRouter }
