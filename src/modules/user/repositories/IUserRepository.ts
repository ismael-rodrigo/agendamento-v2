import { User } from "@prisma/client"
import {CreateUserDTO } from "../dtos/createUserDTO"
import { LoginUserDTO } from "../dtos/loginUserDTO"


export interface IUserRepository {
    createUser(params:CreateUserDTO.params) : Promise <CreateUserDTO.returned>
    getFistUser(username:string) : Promise <User | null>
}