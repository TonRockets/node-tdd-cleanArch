import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccounMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { type Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accounMongoRepository = new AccounMongoRepository()
  const bcryptAdapterAdapter = new BcryptAdapter(12)
  const addAccount = new DbAddAccount(
    bcryptAdapterAdapter,
    accounMongoRepository
  )

  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    addAccount
  )
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
