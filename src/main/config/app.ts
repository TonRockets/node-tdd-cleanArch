import express from 'express'
import setUpMidd from './middlewares'
import setUpRoutes from './routes'

const app = express()
setUpMidd(app)
setUpRoutes(app)
export default app
