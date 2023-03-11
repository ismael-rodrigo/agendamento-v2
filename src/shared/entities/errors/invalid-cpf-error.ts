import { AppError } from "../../errors-handler/errors/app-error";

export class InvalidCpfError extends AppError {
    constructor(cpf:string){
        super(`The cpf "${cpf}" is invalid` , "CPF_INVALID")
    }
}