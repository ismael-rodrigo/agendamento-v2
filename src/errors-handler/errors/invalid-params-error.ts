import { AppError } from "../app-error";


export class InvalidParamsError extends AppError {
    constructor(){
        super( "Invalid params error!" , "INVALID_PARAMS")
    }
}