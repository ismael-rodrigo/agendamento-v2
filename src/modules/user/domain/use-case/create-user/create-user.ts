import { IPasswordEncryptProvider } from "../../../../_ports/providers/password-encrypt/password-encrypt.interface";
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error";
import { User } from "../../entity/user";
import { IUserRepository } from "../../port/user-repository.interface";
import { CreateUserRequest, CreateUserResponse } from "./create-user-data";


export class CreateUserUseCase {
    constructor(
        private userRepository:IUserRepository,
        private passwordHashProvider:IPasswordEncryptProvider,
        ){}
    
    async execute ({ username , password } : CreateUserRequest) : Promise < CreateUserResponse > {

    const userAlreadyExists = await this.userRepository.getUserByUsername(username)
    
    if(userAlreadyExists){
        return Left.create( new InvalidParamsError )
    }

    const userOrError = await User.create(this.passwordHashProvider , { username , password })
    if(userOrError.isLeft()){
        return Left.create(new InvalidParamsError )
    }


    const result = await this.userRepository.createUser({ password:userOrError.value.password.value , username:userOrError.value.username.value })
    if(result.isLeft()){
        return Left.create(new InvalidParamsError)
    }
    return Right.create(result.value) 
    
}
}