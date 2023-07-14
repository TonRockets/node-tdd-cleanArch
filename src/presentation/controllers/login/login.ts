import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'

export class Login implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(badRequest(new MissingParamError('email')))
  }
}
