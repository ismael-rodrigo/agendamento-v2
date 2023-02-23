import { CreateUserData, UserData } from '../../_entities/user/user-data';
import { DbGenericError } from '../../../shared/errors-handler/errors/db-generic-error';
import { Either } from '../../../shared/errors-handler/either';


export interface IUserRepository {
    createUser(params:CreateUserData) : Promise < Either < DbGenericError , UserData >>
    getUserByUsername(username:string) : Promise <Either < DbGenericError , UserData | null>>
    getUserById(id:string) : Promise <Either < DbGenericError , UserData | null >>
}