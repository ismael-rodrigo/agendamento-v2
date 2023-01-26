import { CreateUserData, UserData } from './../entity/user-data';
import { User } from "@prisma/client"
import { Either } from '../../../../shared/errors-handler/either';
import { DbGenericError } from '../../../../shared/errors-handler/errors/db-generic-error';





export interface IUserRepository {
    createUser(params:CreateUserData) : Promise < Either < DbGenericError , UserData >>
    getUserByUsername(username:string) : Promise <Either < DbGenericError , User | null>>
    getUserById(id:string) : Promise <Either < DbGenericError , User | null >>
}