import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccounMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accounMongoRepository = new AccounMongoRepository()
  const bcryptAdapterAdapter = new BcryptAdapter(12)
  const addAccount = new DbAddAccount(bcryptAdapterAdapter, accounMongoRepository)
  return new SignUpController(emailValidatorAdapter, addAccount)
}
