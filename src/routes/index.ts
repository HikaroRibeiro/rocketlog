import { Router } from 'express'
import { usersRoute } from './users-route'
import { sessionsRouter } from './sessions-route'
import { deliveriesRouter } from './deliveries-route'

const routes = Router()

routes.use('/users', usersRoute)
routes.use('/sessions', sessionsRouter)
routes.use('/deliveries', deliveriesRouter)

export { routes }
