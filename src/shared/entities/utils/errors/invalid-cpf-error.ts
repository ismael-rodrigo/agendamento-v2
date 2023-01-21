import { AppError } from "../../../../errors-handler/app-error";


export class InvalidCpfError extends AppError {
    constructor(cpf:string){
        super(`The cpf "${cpf}" is invalid` , "InvalidCpfError")
    }
}