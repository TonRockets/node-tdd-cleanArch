import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Account Mongo repository', () => {
  beforeEach(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    app.post('/api/signup', (req, res, next) => {
      res.send()
    })

    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wellington',
        email: 'wellington.pereira@gmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200)
  })
})
