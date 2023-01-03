import {CreateUserDTO } from "../dtos/create-user-DTO"
import { UserEntity } from "../entities/user.entity"


export interface IUserRepository {
    createUser(params:CreateUserDTO.params) : Promise < CreateUserDTO.returned >
    getUserByUsername(username:string) : Promise < UserEntity | null>
    getUserById(id:string) : Promise < UserEntity | null >
}