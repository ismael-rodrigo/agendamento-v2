import { InvalidPasswordError } from './../../../../shared/entities/errors/invalid-password-error';
import { InvalidParamsError } from './../../../../shared/errors-handler/errors/invalid-params-error';
import { Either, Left, Right } from './../../../../shared/errors-handler/either';
import { IPasswordEncryptProvider } from './../../../_ports/providers/password-encrypt/password-encrypt.interface';
import { IJwtProvider } from './../../../_ports/providers/jwt/jwt-provider.interface';
import { ICommonUserRepository } from './../../../_ports/repository/common-user-repository.interface';
import { CreateTokensReturned } from '@domain/_ports/providers/jwt/jtw-provider.types';

export type LoginCommonUserDTO = {
    cpf:string
    password:string
}

export class LoginCommonUser {
    constructor(
        private readonly passwordEcrypt: IPasswordEncryptProvider,
        private readonly commonUserRepo: ICommonUserRepository,
        private readonly jwtProvider: IJwtProvider
    ){}

    async execute( { cpf , password }:LoginCommonUserDTO ):Promise<Either< InvalidParamsError | InvalidPasswordError , CreateTokensReturned>> {
        if(!cpf || !password) return Left.create(new InvalidParamsError)
        const userCpf = await this.commonUserRepo.findUserByCPF(cpf)
        if(userCpf.isLeft()) return Left.create(userCpf.error)
        if(!userCpf.value) return Left.create(new InvalidParamsError('User not exists'))

        const passwordIsValid = await this.passwordEcrypt.verifyHash(userCpf.value.password , password)
        if(passwordIsValid.isLeft()) return Left.create(passwordIsValid.error)
        if(!passwordIsValid.value) return Left.create(new InvalidPasswordError)

        const tokens = this.jwtProvider.createTokens(userCpf.value.id)

        return Right.create(tokens)
    }
}