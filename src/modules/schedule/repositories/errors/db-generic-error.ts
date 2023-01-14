import { AppError } from "../../../../errors-handler/app-error";

export class DbGenericError extends AppError {
    constructor(indetificator?:string){
        super(indetificator?`Error in run ${indetificator}`:"Database generic error" , indetificator?indetificator:"DB_GENERIC_ERROR")
    }
}