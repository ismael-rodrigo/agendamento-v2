import { User , PrismaClient} from "@prisma/client";
import { singleton } from "tsyringe";
import { db } from "../../../prisma-client/client";
import { CreateUserDTO } from "../dtos/create-user-DTO";
import { IUserRepository } from "./user-repository.interface";



@singleton()
export class UserRepository implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser(params:CreateUserDTO.params) :Promise <CreateUserDTO.returned>{
        const userCreated = await this.client.user.create({ data: params , select: { id:true , username:true }})
        return userCreated
    }

    async getUserByUsername(username:string): Promise <User | null>  {
        const getUser = await this.client.user.findUnique({ where: { username } })
        return getUser
    }

    async getUserById(id:number):Promise <User | null> {
        const getUser = await this.client.user.findUnique({ where: { id } })
        return getUser
    }
}

