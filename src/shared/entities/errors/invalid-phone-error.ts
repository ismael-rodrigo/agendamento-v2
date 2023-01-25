import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidPhoneError extends AppError {
    constructor(phone:string){
        super(`The phone "${phone}" is invalid` , "PhoneInvalidError")
    }
}