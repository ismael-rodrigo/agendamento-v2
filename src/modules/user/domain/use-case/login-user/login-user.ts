import { IJwtProvider } from "../../../../_ports/providers/jwt/jwt-provider.interface";
import { IPasswordEncryptProvider } from "../../../../_ports/providers/password-encrypt/password-encrypt.interface";
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { CredentialsInvalidError } from "../../../../../shared/errors-handler/errors/credentials-invalid-error";
import { IUserRepository } from "../../port/user-repository.interface";
import { LoginUserRequest, LoginUserResponse } from "./login-user-data";


export class LoginUserUseCase {
    constructor(
        private readonly userRepository:IUserRepository,
        private readonly passwordHashProvider:IPasswordEncryptProvider,
        private readonly jwtProvider:IJwtProvider
        ){}


    async execute( { username , password } : LoginUserRequest) : Promise< LoginUserResponse > {
        
        const userAlreadyExists = await this.userRepository.getUserByUsername(username);
        if(userAlreadyExists.isLeft()){
            return Left.create(userAlreadyExists.error)
        }
        if(!userAlreadyExists.value) {
            return Left.create( new CredentialsInvalidError )
        }
        
        const isValidPassword = await this.passwordHashProvider.verifyHash(userAlreadyExists.value.password , password);
        if(isValidPassword.isLeft()){
            return Left.create(isValidPassword.error)
        }
        if(!isValidPassword.value) {
            return Left.create( new CredentialsInvalidError )
        }
        
        const tokens = this.jwtProvider.createTokens( String( userAlreadyExists.value.id ) )

        return Right.create(tokens)
        
    }
}