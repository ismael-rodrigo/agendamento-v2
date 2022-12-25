import { AppError } from "../../../../errors/appError";
import { db } from "../../../../prisma-client/client";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/IPasswordEncrypt";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/PasswordEncrypt";
import { LoginUserDTO } from "../../dtos/loginUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class LoginUserUseCase {
    constructor(
        private userRepository:IUserRepository,
        private passwordHashProvider:IPasswordEncryptProvider
        ){}


    async execute({name , password} : LoginUserDTO.params) : Promise<LoginUserDTO.returned>{

        const userAlreadyExists = await this.userRepository.getFistUser(name)

        if(!userAlreadyExists) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        
        const isValidPassword = await this.passwordHashProvider.verifyHash(userAlreadyExists.password , password);
        if(!isValidPassword) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        

        return{
            token:{
                access:"access",
                refresh:"refresh"
            }
        }
    }
}