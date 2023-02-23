import { Left, Right } from "../../../../shared/errors-handler/either";
import { InvalidParamsError } from "../../../../shared/errors-handler/errors/invalid-params-error";
import { User } from "../../../_entities/user/user";
import { IPasswordEncryptProvider } from "../../../_ports/providers/password-encrypt/password-encrypt.interface";
import { IUserRepository } from "../../../_ports/repository/user-repository.interface";
import { CreateUserRequest, CreateUserResponse } from "./create-user-data";


export class CreateUserUseCase {
    constructor(
        private userRepository:IUserRepository,
        private passwordHashProvider:IPasswordEncryptProvider,
        ){}
    
    async execute ({ username , password } : CreateUserRequest) : Promise < CreateUserResponse > {

    const userAlreadyExists = await this.userRepository.getUserByUsername(username)
    if(userAlreadyExists.isLeft()){
        return Left.create(userAlreadyExists.error)
    }

    if(userAlreadyExists.value){
        return Left.create( new InvalidParamsError('User already exists') )
    }

    const userOrError = await User.create( this.passwordHashProvider , { username , password })
    if(userOrError.isLeft()){
        return Left.create(userOrError.error)
    }


    const result = await this.userRepository.createUser( {id:userOrError.value.id.value , password:userOrError.value.password.value , username:userOrError.value.username.value })
    if(result.isLeft()){
        return Left.create(result.error)
    }
    return Right.create(result.value) 
    
}
}