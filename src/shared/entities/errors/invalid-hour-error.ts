import { AppError } from "../../errors-handler/errors/app-error";

export class invalidHourError extends AppError {
    constructor(){
        super('Invalid hour' , 'INVALID_HOUR')
    }
}