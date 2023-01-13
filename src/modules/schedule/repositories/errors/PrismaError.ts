import { AppError } from "../../../../errors-handler/app-error";

export class DbGenericError extends AppError {
    constructor(){
        super("Database generic error" , "DB_GENERIC_ERROR")
    }
}