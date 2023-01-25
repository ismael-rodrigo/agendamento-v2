import { AppError } from "../../errors-handler/errors/app-error";

export class invalidBirthDateError extends AppError {
    constructor(){
        super("The date is invalid" , "invalidBirthDateError")
    }
}