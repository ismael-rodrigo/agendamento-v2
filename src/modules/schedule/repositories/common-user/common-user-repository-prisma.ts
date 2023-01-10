import { PrismaClient } from "@prisma/client";
import { CommomUserData } from "../../../../entities/common-user/commom-user-data";
import { CommomUser } from "../../../../entities/common-user/common-user";
import { AppError } from "../../../../errors-handler/app-error";
import { Either, Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { ICommonUserRepository } from "./common-user-repository.interface";

export class CommomUserPrismaRepository implements ICommonUserRepository {
    constructor(private client: PrismaClient){}
    async createUser({cpf , date_birth , name , phone_number , id  } :CommomUser) : Promise < Either<AppError, CommomUserData >> {

        if( !id.value || !cpf.value || !date_birth.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)

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

}