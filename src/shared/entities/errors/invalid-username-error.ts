import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidUserNameError extends AppError {
    constructor(name:string){
        super(`The Username "${name}" is invalid` , "InvalidUserNameError")
    }
}