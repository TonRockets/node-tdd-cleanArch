import type { HttpResponse, HttpRequest } from '../protocols/http'
import type { EmailValidator } from '../protocols/email-validator'
import type { Controller } from '../protocols/controller'

import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValidEmail = this.emailValidator.isValid(httpRequest.body)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
