import { PrismaClient } from "@prisma/client";
import { Either, Left, Right } from "@shared/errors-handler/either";
import { DbGenericError } from "@shared/errors-handler/errors/db-generic-error";
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error";
import { CommonUserData } from "@domain/_entities/common-user/commom-user-data";
import { CommomUser } from "@domain/_entities/common-user/common-user";
import { ICommonUserRepository } from "@domain/_ports/repository/common-user-repository.interface";

export class CommomUserPrismaRepository implements ICommonUserRepository {
    constructor(private client: PrismaClient){}
    async findUserByCPF(cpf: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        try{
            const result = await this.client.commomUser.findUnique({
                where:{
                    cpf
                }
            })
            return Right.create(result)
        }
        catch (err) {
            return Left.create(new DbGenericError('findUserByCPF'))
        }
    }
    async findUserByEmail(email: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        try{
            const result = await this.client.commomUser.findFirst({
                where:{
                    email
                }
            })
            return Right.create(result)
        }
        catch (err) {
            return Left.create(new DbGenericError('findUserById'))
        }
    }
    async createUser({cpf   , name , phone_number , id , email , password} : CommomUser) : Promise < Either<InvalidParamsError, CommonUserData >> {
        if( !id.value || !cpf.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)
        try{
            const user_created = await this.client.commomUser.create({
                data:{
                    password:password.value,
                    email:email.value,
                    cpf:cpf.value ,
                    name:name.value ,
                    phone_number:phone_number.value , 
                    id:id.value
            }})
            return Right.create(user_created)
        }
        catch (err) {

            return Left.create(new DbGenericError('CommomUserPrismaRepository.createUser'))
        }
    }

    async findUserById(user_id: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        try{
            if(!user_id) return Left.create(new InvalidParamsError('user id not provided'))
            const result = await this.client.commomUser.findUnique({
                where:{
                    id:user_id
                }
            })
            return Right.create(result)
        }
        catch (err) {
            return Left.create(new DbGenericError('CommomUserPrismaRepository.findUserById'))
        }
    }

}