import { User } from "@prisma/client";
import { AppError } from "../../../errors/appError";
import { db } from "../../../prisma-client/client";
import { PasswordEncryptProvider } from "../../../utils/password-encrypt-provider/PasswordEncrypt";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository{
    async createUser({ name , password }:CreateUserDTO.params) :Promise <CreateUserDTO.returned>{
        const userCreated = await db.user.create({
            data:{
                name,
                password
            }
        })
        return userCreated
    }

    async getFistUser(username:string) : Promise<User | null>{
        const getUser = await db.user.findFirst( { where: { name : username } } )
        return getUser
    }




}

