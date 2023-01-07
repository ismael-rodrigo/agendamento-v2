import { AppError } from "../../../errors-handler/app-error";

export class InvalidNameError extends AppError {
    constructor(name:string){
        super(`The name "${name}" is invalid` , "InvalidNameError")
    }
}