import { Either, Left, Right } from '@shared/errors-handler/either';
import { PrismaClient, User} from "@prisma/client";

import { DbGenericError } from '@shared/errors-handler/errors/db-generic-error';
import { IUserRepository } from '@domain/_ports/repository/user-repository.interface';
import { CreateUserData, UserData } from '@domain/_entities/user/user-data';



export class UserRepositoryPrisma implements IUserRepository{
    constructor(private client:PrismaClient){}

    async createUser({id , password ,username ,is_admin}:CreateUserData) : Promise < Either < DbGenericError , UserData >>{
        try {
            if(!id){
                return Left.create(new DbGenericError('Id not provided'))
            }
            const userCreated = await this.client.user.create({ data: {
                id,
                password,
                username,
            } })
            
            return Right.create(userCreated)
        }
        catch (err){
            return Left.create(new DbGenericError('UserRepositoryPrisma.createUser'))
        }

    }

    async getUserByUsername(username:string):Promise < Either< DbGenericError , User | null>>  {
        try{
            const getUser = await this.client.user.findUnique({ where: { username } })
            return Right.create(getUser)
        }
        catch (err ){
            return Left.create(new DbGenericError('UserRepositoryPrisma.getUserByUsername'))
        }
       
    }

    async getUserById(id:string):Promise < Either< DbGenericError , User | null>> {
        try{
            const getUser = await this.client.user.findUnique({ where: { id } })
            return Right.create(getUser)    
        }
        catch (err){
            return Left.create(new DbGenericError('UserRepositoryPrisma.getUserById'))
        }
        
    }
}

