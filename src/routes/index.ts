import { Router } from 'express'
import { usersRoute } from './users-route'
import { sessionsRouter } from './sessions-route'
import { deliveriesRouter } from './deliveries-route'
import { deliveriesLogsRouter } from './deliveries-logs-route'

const routes = Router()

routes.use('/users', usersRoute)
routes.use('/sessions', sessionsRouter)
routes.use('/deliveries', deliveriesRouter)
routes.use('/delivery-logs', deliveriesLogsRouter)

export { routes }
