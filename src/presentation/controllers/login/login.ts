import { type Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authenticaction: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authenticaction
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requeridFields = ['password', 'email']

      for (const field of requeridFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) return unauthorized()

      return {
        statusCode: 200,
        body: httpRequest
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
