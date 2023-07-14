import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Login } from './login'

// const makeFakeRequest = (): any => ({
//   email: 'any_email',
//   password: 'any_password'
// })

const makeSut = (): Login => {
  return new Login()
}

describe('Login Controller', () => {
  test('should return 400 if no email is provide', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
