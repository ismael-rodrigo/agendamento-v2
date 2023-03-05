import { CommonUserData } from '@domain/_entities/common-user/commom-user-data';
import { AppError } from '@shared/errors-handler/errors/app-error';
import { InvalidParamsError } from '@shared/errors-handler/errors/invalid-params-error';
import { Left, Right, Either } from '@shared/errors-handler/either';
import { ICommonUserRepository } from '@domain/_ports/repository/common-user-repository.interface';
import { Cpf } from '@shared/entities/cpf';

export type CheckCommonUserAlreadyExistsRequest = {
    cpf:string
}

export type CheckCommonUserAlreadyExistsResponse = Either<AppError , string>

export default class CheckCommonUserAlreadyExists {
    constructor(
        private readonly commonUserRepo: ICommonUserRepository

    ){}
    async execute({ cpf }:CheckCommonUserAlreadyExistsRequest):Promise<CheckCommonUserAlreadyExistsResponse>{
        if(!Cpf.validate(cpf)) return Left.create(new InvalidParamsError('CPF invalid'))
        const userOrError = await this.commonUserRepo.findUserByCPF(cpf)    
        if(userOrError.isLeft()) return Left.create(userOrError.error)
        if(!userOrError.value) return Left.create(new InvalidParamsError('User not exists'))
        return Right.create("ok")
    }
}