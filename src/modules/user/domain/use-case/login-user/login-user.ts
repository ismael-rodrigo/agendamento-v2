import { inject, injectable } from "tsyringe";
import {  Left, Right } from "../../../../../errors-handler/either";
import { CredentialsInvalidError } from "../../../../../errors-handler/errors/credentials-invalid-error";
import { IJwtProvider } from "../../../../../utils/jwt-provider/jwt-provider.interface";
import { IPasswordEncryptProvider } from "../../../../../utils/password-encrypt-provider/password-encrypt.interface";
import { LoginUserDTO } from "../../../http/rest/dtos/login-user-DTO";
import { IUserRepository } from "../../port/user-repository.interface";
import { LoginUserResponse } from "./login-user-response";




@injectable()
export class LoginUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider,
        @inject("JwtProvider") private jwtProvider:IJwtProvider
        ){}


    async execute( { username , password } : LoginUserDTO.params) : Promise< LoginUserResponse > {
        
        const userAlreadyExists = await this.userRepository.getUserByUsername(username);
        if(!userAlreadyExists) {
            return Left.create( new CredentialsInvalidError )
        }
        
        const isValidPassword = await this.passwordHashProvider.verifyHash(userAlreadyExists.password , password);
        
        if(!isValidPassword) {
            return Left.create( new CredentialsInvalidError )
        }
        
        const tokens = this.jwtProvider.createTokens(String(userAlreadyExists.id))

        return Right.create(tokens)
        
    }
}