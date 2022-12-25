import { AppError } from "../../../../errors/appError";
import { db } from "../../../../prisma-client/client";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/PasswordEncrypt";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/IPasswordEncrypt";



export class CreateUserUseCase {
    constructor(
        private userRepository:IUserRepository,
        private passwordHashProvider:IPasswordEncryptProvider
        ){}
    
    async execute ({name , password} : CreateUserDTO.params) : Promise<CreateUserDTO.returned> {

    await this.userRepository.getUserOrThrow(name);

    const password_hashed = await this.passwordHashProvider.generateHash(password);

    const result = await this.userRepository.createUser({name, password:password_hashed})

    return result as CreateUserDTO.returned

    
}

}