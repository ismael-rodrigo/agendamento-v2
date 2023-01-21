import { CreateUserRequest, CreateUserResponse } from './../use-case/create-user/create-user-data';
import { User } from "@prisma/client"



export interface IUserRepository {
    createUser(params:CreateUserRequest) : Promise < CreateUserResponse >
    getUserByUsername(username:string) : Promise < User | null>
    getUserById(id:string) : Promise < User | null >
}