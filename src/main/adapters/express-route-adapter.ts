import { Controller } from '@domain/_ports/controllers/controller';
import { Request, Response } from 'express'
import { HttpRequest } from '@domain/_ports/controllers/http'


export interface AuthenticatedRequest extends Request {
  consumer_id?:string
}




export const adaptRoute = (controller:Controller ) => {

  return async (req: AuthenticatedRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      consumer_id: req.consumer_id,
      body: req.body,
      params: req.params,
      query: req.query
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}
}