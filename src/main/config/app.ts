import express from 'express'
import setUpMidd from './middlewares'

const app = express()
setUpMidd(app)

export default app
