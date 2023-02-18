import { AppError } from './../../errors-handler/errors/app-error';
export class InvalidEmailError extends AppError  {
    constructor (email: string) {
      super(`The email "${email}" is invalid.` , 'InvalidEmailError' , 400)

    }
  }