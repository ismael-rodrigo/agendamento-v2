import { AppError } from './../../../../shared/errors-handler/errors/app-error';
import { Either } from "../../../../shared/errors-handler/either"


export interface EmailOptions {
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html: string
  readonly attachments?: Object[]
}

export interface IEmailService {
  send: (options: EmailOptions) => Promise<Either<AppError, EmailOptions>>
}