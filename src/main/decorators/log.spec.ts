// import { ServerError } from '../../presentation/errors'
import { type LogErrorRepository } from '../../data/protocols/log-error-repository'
import { type AccountModel } from '../../domain/models/account'
import { ServerError } from '../../presentation/errors'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(makeFakeAccout()))
    }
  }
  const controllerStub = new ControllerStub()
  return controllerStub
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return Promise.resolve()
    }
  }
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  return logErrorRepositoryStub
}

const makeFakeAccout = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_pass'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    controllerStub,
    logErrorRepositoryStub,
    sut
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return the same result from controller', async () => {
    const { sut } = makeSut()
    // const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccout()))
  })

  test('should call logErrorRepository with correct error if controller returns a serverError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const error = serverError(new ServerError('any_stack'))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
