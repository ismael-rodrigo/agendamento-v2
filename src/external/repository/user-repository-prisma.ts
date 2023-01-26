import { Either, Left, Right } from './../../shared/errors-handler/either';
import { CreateUserRequest, CreateUserResponse } from './../../modules/user/domain/use-case/create-user/create-user-data';
import { PrismaClient, User} from "@prisma/client";
import { IUserRepository } from "../../modules/user/domain/port/user-repository.interface";
import { DbGenericError } from '../../shared/errors-handler/errors/db-generic-error';


export class UserRepositoryPrisma implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser(params:CreateUserRequest) :Promise < CreateUserResponse >{
        const userCreated = await this.client.user.create({ data: params , select: { id: true , username: true }})
        return Right.create(userCreated)
    }

    async getUserByUsername(username:string):Promise < Either< DbGenericError , User | null>>  {
        try{
            const getUser = await this.client.user.findUnique({ where: { username } })
            return Right.create(getUser)
        }
        catch (err ){
            return Left.create(new DbGenericError('getUserByUsername'))
        }
       
    }

    async getUserById(id:string):Promise < Either< DbGenericError , User | null>> {
        try{
            const getUser = await this.client.user.findUnique({ where: { id } })
            return Right.create(getUser)    
        }
        catch (err){
            return Left.create(new DbGenericError('getUserById'))
        }
        
    }
}

