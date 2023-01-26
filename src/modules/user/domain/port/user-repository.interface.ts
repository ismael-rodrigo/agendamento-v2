import { CreateUserRequest,  CreateUserResponseData } from './../use-case/create-user/create-user-data';
import { User } from "@prisma/client"
import { Either } from '../../../../shared/errors-handler/either';
import { DbGenericError } from '../../../../shared/errors-handler/errors/db-generic-error';



export interface IUserRepository {
    createUser(params:CreateUserRequest) : Promise < Either < DbGenericError , CreateUserResponseData >>
    getUserByUsername(username:string) : Promise <Either < DbGenericError , User | null>>
    getUserById(id:string) : Promise <Either < DbGenericError , User | null >>
}