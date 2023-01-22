import { AppError } from "../../../errors-handler/errors/app-error";

export class InvalidPasswordProviderParams extends AppError {
    constructor(){
        super('Invalid params' , 'InvalidPasswordProviderParams')
    }
}