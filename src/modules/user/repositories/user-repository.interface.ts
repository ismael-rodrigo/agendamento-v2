import { User } from "@prisma/client"
import {CreateUserDTO } from "../dtos/create-user-DTO"



export interface IUserRepository {
    createUser(params:CreateUserDTO.params) : Promise < CreateUserDTO.returned >
    getUserByUsername(username:string) : Promise < User | null>
    getUserById(id:string) : Promise < User | null >
}