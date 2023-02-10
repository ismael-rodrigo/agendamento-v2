import { Uuid } from './../../../src/shared/entities/uuid';
import { PrismaClient } from '@prisma/client';
export const createDayDisabled = async (service_id:string , day:number, prisma:PrismaClient)=>{
    return await prisma.dayDisabled.create({
        data:{
            id:Uuid.create().value,
            day,
            service_id
        }
    })
}