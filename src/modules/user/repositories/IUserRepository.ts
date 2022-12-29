import { User } from "@prisma/client"
import {CreateUserDTO } from "../dtos/createUserDTO"
import { LoginUserDTO } from "../dtos/loginUserDTO"


export interface IUserRepository {
    createUser(params:CreateUserDTO.params) : Promise <CreateUserDTO.returned>
    getUserByUsername(username:string) : Promise <User | null>
    getUserById(id:number) : Promise <User | null >
}