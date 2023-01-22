import { AppError } from "../../../errors-handler/app-error";

export class InvalidPasswordProviderParams extends AppError {
    constructor(){
        super('Invalid params' , 'InvalidPasswordProviderParams')
    }
}