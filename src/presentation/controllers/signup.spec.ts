import type { EmailValidator } from '../protocols/email-validator'

import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

// a Factory Pattern
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

// // Creating a new EmailValidator's instance to set a internal error exception
// const makeEmailValidatorWithError = (): EmailValidator => {
//   class EmailValidatorStub implements EmailValidator {
//     isValid(email: string): boolean {
//       throw new Error()
//     }
//   }

//   return new EmailValidatorStub()
// }

// a Factory pattern
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nay_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nay_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nay_name',
        email: 'any_email@email.com',
        password: 'any_pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nay_name',
        email: 'any_email@email.com',
        password: 'any_pass',
        passwordConfirmation: 'invalid_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is no provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 500 if EmailValidator throws exception', () => {
    const { sut, emailValidatorStub } = makeSut()

    // This conde implements a new Error, without need to create a new emailValidator's instance
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(500)

    /* When we compare object we need to use 'toEqual' instead toBe,
    because toBe compare type and value of an object, the toEqual just
    compare a value.
    */
    expect(httpResponse?.body).toEqual(new ServerError())
  })
})
