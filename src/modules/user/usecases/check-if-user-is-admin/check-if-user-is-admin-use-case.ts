import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError"; 
import { IJwtProvider } from "../../../../utils/jwt-provider/jwtProvider.interface";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/IPasswordEncrypt";
import { LoginUserDTO } from "../../dtos/loginUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CheckUserIsAdminUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider,
        @inject("JwtProvider") private jwtProvider:IJwtProvider
        ){}


    async execute(token:string) : Promise< void >{
        const resultTokenId = this.jwtProvider.verifyToken(token)

        const userAlreadyExists = await this.userRepository.getUserById(Number(resultTokenId));
        if(!userAlreadyExists) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        
        if(!userAlreadyExists.is_admin) throw new AppError("You do not have permission!","NOT_PERMISSION");

        return;
        
    }
}