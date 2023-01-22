import { AppError } from "../../../errors-handler/app-error";

export class InvalidPayloadError extends AppError {
    constructor(){
        super("Invalid payload error" , "JwtInvalidPayloadError")
    }
}
