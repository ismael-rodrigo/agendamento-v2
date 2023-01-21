import { inject, injectable } from "tsyringe";
import { Left, Right } from "../../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../../errors-handler/errors/invalid-params-error";
import { IPasswordEncryptProvider } from "../../../../../utils/password-encrypt-provider/password-encrypt.interface";
import { IObjectValidator } from "../../../../../validations/object-validator-yup.interface";
import { CreateUserDTO } from "../../../http/rest/dtos/create-user-DTO";
import { IUserRepository } from "../../port/user-repository.interface";
import { createUserArgSchema } from "./create-user-args-schema";
import { CreateUserResponse } from "./create-user-response";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider,
        @inject("ObjectValidator") private objectValidator:IObjectValidator
        ){}
    
    async execute ({ username , password } : CreateUserDTO.params) : Promise < CreateUserResponse > {

    await this.objectValidator.compare(createUserArgSchema , { username , password })

    const userAlreadyExists = await this.userRepository.getUserByUsername(username)
    
    if(userAlreadyExists){
        return Left.create( new InvalidParamsError )
    }
    
    const password_hashed = await this.passwordHashProvider.generateHash(password);
    if(password_hashed.isLeft()){
        return Left.create(new InvalidParamsError)
    }
    const result = await this.userRepository.createUser({username, password:password_hashed.value })
    
    return Right.create(result) 
    
}
}