import { AppError } from "../../../../errors/appError";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/IPasswordEncrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider
        ){}
    
    async execute ({username , password} : CreateUserDTO.params) : Promise<CreateUserDTO.returned> {

    const userAlreadyExists = await this.userRepository.getUserByUsername(username);

    if(userAlreadyExists){
        throw new AppError("User already exists!" , "USER_ALREADY_EXISTS");
    }
    const password_hashed = await this.passwordHashProvider.generateHash(password);
    const result = await this.userRepository.createUser({username, password:password_hashed })
    
    return result 
    
}
}