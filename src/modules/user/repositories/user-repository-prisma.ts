import { PrismaClient, User} from "@prisma/client";
import { CreateUserDTO } from "../dtos/create-user-DTO";
import { IUserRepository } from "./user-repository.interface";


export class UserRepositoryPrisma implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser(params:CreateUserDTO.params) :Promise < CreateUserDTO.returned >{
        const userCreated = await this.client.user.create({ data: params , select: { id: true , username: true }})
        return userCreated
    }

    async getUserByUsername(username:string): Promise < User | null>  {
        const getUser = await this.client.user.findUnique({ where: { username } })
        return getUser
    }

    async getUserById(id:string):Promise < User | null> {
        const getUser = await this.client.user.findUnique({ where: { id } })
        return getUser
    }
}

