import { AppError } from "../../../errors-handler/errors/app-error";

export class InvalidPayloadError extends AppError {
    constructor(){
        super("Invalid payload error" , "JwtInvalidPayloadError")
    }
}
