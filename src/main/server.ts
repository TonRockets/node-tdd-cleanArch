import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port || 8080, () =>
      console.log(`Server running at http://localhost:${env.port || 8080}/`)
    )
  })
  .catch(console.error)
