import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidPasswordError extends AppError {
    constructor(){
        super('Invalid password' , 'INVALID_PASSWORD')
    }
}