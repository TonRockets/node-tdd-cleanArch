import { type Request, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (constroller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await constroller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
