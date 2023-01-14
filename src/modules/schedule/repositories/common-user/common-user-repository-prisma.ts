import { PrismaClient } from "@prisma/client";
import { CommomUserData } from "../../../../entities/common-user/commom-user-data";
import { CommomUser } from "../../../../entities/common-user/common-user";
import { AppError } from "../../../../errors-handler/app-error";
import { Either, Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { DbGenericError } from "../errors/db-generic-error";
import { ICommonUserRepository } from "./common-user-repository.interface";

export class CommomUserPrismaRepository implements ICommonUserRepository {
    constructor(private client: PrismaClient){}
    async createUser({cpf , date_birth , name , phone_number , id  } : CommomUser) : Promise < Either<InvalidParamsError, CommomUserData >> {
        if( !id.value || !cpf.value || !date_birth.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)
        try{
            const user_created = await this.client.commomUser.create({
                data:{
                    cpf:cpf.value ,
                    date_birth:date_birth.value ,
                    name:name.value ,
                    phone_number:phone_number.value , 
                    id:id.value
            }})
            return Right.create(user_created)
        }
        catch (err) {
            return Left.create(new DbGenericError)
        }
    }

    async findUserById(user_id: string): Promise<Either<DbGenericError, CommomUserData | null>> {
        try{
            const result = await this.client.commomUser.findUnique({
                where:{
                    id:user_id
                }
            })
            return Right.create(result)
        }
        catch (err) {
            return Left.create(new DbGenericError)
        }
    }

}