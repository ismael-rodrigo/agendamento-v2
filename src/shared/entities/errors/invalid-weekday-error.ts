import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidWeekday extends AppError {
    constructor(){
        super(`The weekday is invalid` , "InvalidWeekday")
    }
}