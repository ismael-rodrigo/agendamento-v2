import { AppError } from "./app-error";


export class CredentialsInvalidError extends AppError {
    constructor(){
        super( "Credentials invalid!" , "CREDENTIALS_INVALID")
    }
} 