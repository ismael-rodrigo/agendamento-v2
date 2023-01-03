import { PrismaClient} from "@prisma/client";
import { CreateUserDTO } from "../dtos/create-user-DTO";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "./user-repository.interface";


export class UserRepositoryPrisma implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser(params:CreateUserDTO.params) :Promise < CreateUserDTO.returned >{
        const userCreated = await this.client.user.create({ data: params , select: { id: true , username: true }})
        return userCreated
    }

    async getUserByUsername(username:string): Promise < UserEntity | null>  {
        const getUser = await this.client.user.findUnique({ where: { username } })
        return getUser
    }

    async getUserById(id:string):Promise < UserEntity | null> {
        const getUser = await this.client.user.findUnique({ where: { id } })
        return getUser
    }
}

