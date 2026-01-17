import express from 'express'
import 'express-async-errors'

import { errorHandle } from './middlewares/error-handle'
import { routes } from './routes'

const app = express()
app.use(express.json())

app.use(routes)

app.use(errorHandle)

export default app
