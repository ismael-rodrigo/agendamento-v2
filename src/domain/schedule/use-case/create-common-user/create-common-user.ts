import { LoginCommonUserResponse } from './../../../auth/use-case/login-common-user/login-common-user-DTO';
import { IJwtProvider } from './../../../_ports/providers/jwt/jwt-provider.interface';

import { CommomUser } from "@domain/_entities/common-user/common-user";
import { IPasswordEncryptProvider } from "@domain/_ports/providers/password-encrypt/password-encrypt.interface";
import { ICommonUserRepository } from "@domain/_ports/repository/common-user-repository.interface";
import { Left, Right } from "@shared/errors-handler/either";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

export class RegisterCommonUser {
    constructor(
        private readonly commonUserRepo:ICommonUserRepository,
        private readonly passwordHasher:IPasswordEncryptProvider,
        private readonly jwtProvider:IJwtProvider
        ){}
    async execute( { cpf  , name , phone_number , email , password } : CreateCommonUserDTO.request ): Promise <CreateCommonUserDTO.response> {
        
        const userOrError = await CommomUser.create(this.passwordHasher , { cpf  , name , phone_number , email , password })
        if(userOrError.isLeft()){
            return Left.create(userOrError.error)
        }
        const user_created = await this.commonUserRepo.createUser(userOrError.value)
        if(user_created.isLeft()){
            return Left.create(user_created.error)
        }

        const tokens = this.jwtProvider.createTokens(userOrError.value.id.value)
        
        const response:LoginCommonUserResponse = {
            user:CommomUser.responseValue(user_created.value),
            token:tokens

        }

        return Right.create(response)
    }
}
