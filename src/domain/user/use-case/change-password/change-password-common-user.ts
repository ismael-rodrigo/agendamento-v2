import { InvalidPasswordError } from './../../../../shared/entities/errors/invalid-password-error';
import { Left, Right } from '@shared/errors-handler/either';
import { Password } from './../../../../shared/entities/password/password';
import { IPasswordEncryptProvider } from '@domain/_ports/providers/password-encrypt/password-encrypt.interface';
import { ICommonUserRepository } from '@domain/_ports/repository/common-user-repository.interface';

export interface ChangePasswordCommonUserUseCaseRequest {
    password:string
    confirm:string
    user_id:string
}

export class ChangePasswordCommonUserUseCase {
    constructor(
        private readonly commonUserRepo:ICommonUserRepository,
        private readonly passwordHasher:IPasswordEncryptProvider
    ){}
    async execute({user_id, password, confirm }:ChangePasswordCommonUserUseCaseRequest){
        if(password != confirm ){
            return Left.create(new InvalidPasswordError)
        }
        const passwordHashed = await Password.createHashed(this.passwordHasher ,password)
        if(passwordHashed.isLeft()) {
            return Left.create(passwordHashed.error)
        }
        const userOrError = await this.commonUserRepo.update(user_id , { password:passwordHashed.value.value })
        if(userOrError.isLeft()) return Left.create(userOrError.error)
        return Right.create('ok')
    }
}