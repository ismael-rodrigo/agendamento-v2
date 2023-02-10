import { Uuid } from './../../../src/shared/entities/uuid';
import { PrismaClient } from '@prisma/client';
export const createDateDisabled = async (service_id:string , date:Date, prisma:PrismaClient)=>{
    return await prisma.dateDisabled.create({
        data:{
            id:Uuid.create().value,
            date,
            service_id
        }
    })
}