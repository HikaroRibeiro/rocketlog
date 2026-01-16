import { Router } from 'express'
import { usersRoute } from './users-route'
import { sessionsRouter } from './sessions-route'

const routes = Router()

routes.use('/users', usersRoute)
routes.use('/sessions', sessionsRouter)

export { routes }
