import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError"; 
import { IJwtProvider } from "../../../../utils/jwt-provider/jwtProvider.interface";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/IPasswordEncrypt";
import { LoginUserDTO } from "../../dtos/loginUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class LoginUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider,
        @inject("JwtProvider") private jwtProvider:IJwtProvider
        ){}


    async execute({username , password} : LoginUserDTO.params) : Promise<LoginUserDTO.returned>{
        const userAlreadyExists = await this.userRepository.getUserByUsername(username);
        if(!userAlreadyExists) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        
        const isValidPassword = await this.passwordHashProvider.verifyHash(userAlreadyExists.password , password);
        if(!isValidPassword) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        
        const token = this.jwtProvider.createTokens(String(userAlreadyExists.id))
        return { token:token }
        
    }
}