import { AppError } from '../../../shared/errors-handler/errors/app-error';
import { HttpResponse } from "./http"


export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: error.statusCode,
  body: error.detail
})

export const ok = <L>(data: L): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new AppError(reason , 'SERVER_ERROR')
})