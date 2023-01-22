import { AppError } from "./app-error";


export class InvalidParamsError extends AppError {
    constructor(param?:string | object , type?:string){
        super( param?param:"Invalid params error!" , type?type:"INVALID_PARAMS")
 

    }
}