import { PrismaClient } from "@prisma/client";
import { CommomUserData } from "../../../../entities/common-user/commom-user-data";
import { ICommonUserRepository } from "./common-user-repository.interface";

export class CommomUserPrismaRepository implements ICommonUserRepository {
    constructor(private client: PrismaClient){}
    async createUser({cpf ,date_birth ,name ,phone_number , id  } :CommomUserData) : Promise < CommomUserData | null > {

        if(!id) return null
        const user_created = await this.client.commomUser.create({
            data:{
                cpf ,
                date_birth ,
                name ,
                phone_number , 
                id
        }})

        return user_created
    }

}