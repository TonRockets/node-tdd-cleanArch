import { type Express, Router } from 'express'
import fastG from 'fast-glob'
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fastG.sync('**/src/main/routes/**routes.ts').map(async (item) => {
    ;(await import(`../../../${item}`)).default(router)
  })
}
