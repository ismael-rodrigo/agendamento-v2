import { AppError } from '../../../shared/errors-handler/app-error';
import { HttpResponse } from "./http"


export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: 400,
  body: error.detail
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new AppError(reason , 'SERVER_ERROR')
})