import { AppError } from "./app-error";


export class AuthenticationError extends AppError {
    constructor(){
        super( "User not authenticated!" , "NOT_AUTHENTICATED" , 403 )
    }
}