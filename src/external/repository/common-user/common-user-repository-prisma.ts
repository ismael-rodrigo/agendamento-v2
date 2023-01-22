import { PrismaClient } from "@prisma/client";
import { Either, Left, Right } from "../../../shared/errors-handler/either";
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error";
import { InvalidParamsError } from "../../../shared/errors-handler/errors/invalid-params-error";
import { CommomUserData } from "../../../modules/schedule/domain/entity/common-user/commom-user-data";
import { CommomUser } from "../../../modules/schedule/domain/entity/common-user/common-user";

import { ICommonUserRepository } from "../../../modules/schedule/domain/port/repository/common-user-repository.interface";

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
            return Left.create(new DbGenericError('findUserById'))
        }
    }

}