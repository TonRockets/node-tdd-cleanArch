import path from 'path'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccounMongoRepository } from './account'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '.env') })

describe('Account Mongo repository', () => {
  beforeEach(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccounMongoRepository()
    const account = sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    // expect((await account).id).toBe('any_id')
    expect((await account).name).toBe('any_name')
    expect((await account).email).toBe('any_email@mail.com')
    expect((await account).password).toBe('any_password')
  })
})
