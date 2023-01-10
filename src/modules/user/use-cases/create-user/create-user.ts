import { CreateUserDTO } from "../../dtos/create-user-DTO";
import { IUserRepository } from "../../repositories/user-repository.interface";
import { IPasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/password-encrypt.interface";
import { inject, injectable } from "tsyringe";
import { IObjectValidator } from "../../../../validations/object-validator-yup.interface";
import { createUserArgSchema } from "./create-user-args-schema";
import { Left, Right } from "../../../../errors-handler/either";
import { CreateUserResponse } from "./create-user-response";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { AppError } from "../../../../errors-handler/app-error";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("PasswordEncryptProvider") private passwordHashProvider:IPasswordEncryptProvider,
        @inject("ObjectValidator") private objectValidator:IObjectValidator
        ){}
    
    async execute ({ username , password } : CreateUserDTO.params) : Promise < CreateUserResponse > {

    const paramsIsValidOrError = await this.objectValidator.compare(createUserArgSchema , { username , password })
    if(paramsIsValidOrError.isLeft()){
        return Left.create(paramsIsValidOrError.error)
    }
    
    const userAlreadyExists = await this.userRepository.getUserByUsername(username)
    if(userAlreadyExists){
        return Left.create( new InvalidParamsError )
    }
    
    const password_hashed = await this.passwordHashProvider.generateHash(password);
    if(password_hashed.isLeft()){
        return Left.create(new AppError(password_hashed.error.detail ,password_hashed.error.type ) )
    }
    const result = await this.userRepository.createUser({username, password: password_hashed.value })
    
    return Right.create(result) 
    
}
}