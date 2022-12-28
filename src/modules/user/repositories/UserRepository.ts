import { User } from "@prisma/client";
import { db } from "../../../prisma-client/client";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository{
    async createUser(params:CreateUserDTO.params) :Promise <CreateUserDTO.returned>{
        const userCreated = await db.user.create({ data: params , select: { id:true , username:true }})
        return userCreated
    }

    async getUserByUsername(username:string){
        const getUser = await db.user.findFirst({ where: { username } })
        return getUser
    }
}

