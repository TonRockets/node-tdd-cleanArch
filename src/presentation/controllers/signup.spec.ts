import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'nay_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
