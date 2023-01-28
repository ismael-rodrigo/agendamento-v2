import { Uuid } from './../../../src/shared/entities/uuid';
import { PrismaClient } from '@prisma/client';
export const createHour = async (service_id:string , hour:number , minutes:number , prisma:PrismaClient)=>{
    return await prisma.hourAvailable.create({
        data:{
            id:Uuid.create().value,
            hour,
            minutes,
            service_id,
        }
    })
}