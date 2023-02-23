import { Controller } from '@domain/_ports/controllers/controller';
import { Request, Response } from 'express'
import { HttpRequest } from '@domain/_ports/controllers/http'

export const adaptRoute = (controller:Controller ) => {

  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}
}