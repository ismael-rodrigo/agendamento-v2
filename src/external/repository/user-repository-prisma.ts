import { Right } from './../../shared/errors-handler/either';
import { CreateUserRequest, CreateUserResponse } from './../../modules/user/domain/use-case/create-user/create-user-data';
import { PrismaClient, User} from "@prisma/client";
import { IUserRepository } from "../../modules/user/domain/port/user-repository.interface";


export class UserRepositoryPrisma implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser(params:CreateUserRequest) :Promise < CreateUserResponse >{
        const userCreated = await this.client.user.create({ data: params , select: { id: true , username: true }})
        return Right.create(userCreated)
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

