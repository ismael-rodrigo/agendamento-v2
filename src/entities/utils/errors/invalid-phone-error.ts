import { AppError } from "../../../errors-handler/app-error";

export class InvalidPhoneError extends AppError {
    constructor(phone:string){
        super(`The phone "${phone}" is invalid` , "PhoneInvalidError")
    }
}