import { Either, Left, Right } from './../../shared/errors-handler/either';
import { PrismaClient, User} from "@prisma/client";
import { IUserRepository } from "../../modules/user/domain/port/user-repository.interface";
import { DbGenericError } from '../../shared/errors-handler/errors/db-generic-error';
import { CreateUserData, UserData } from '../../modules/user/domain/entity/user-data';


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

