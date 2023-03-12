import { Either } from '@shared/errors-handler/either';
import { InvalidParamsError } from '@shared/errors-handler/errors/invalid-params-error';
export interface RecoveryCommonUserRequest {
    cpf:string
    email:string
}

export type RecoveryCommonUserResponse  = Either<InvalidParamsError , string>