import { AppError } from "../../errors-handler/errors/app-error";

export class invalidMinutesError extends AppError {
    constructor(){
        super('Invalid minutes' , 'INVALID_MINUTES')
    }
}