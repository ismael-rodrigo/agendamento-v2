import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidNameError extends AppError {
    constructor(name:string){
        super(`The name "${name}" is invalid` , "InvalidNameError")
    }
}