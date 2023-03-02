import { Uuid } from '../../../src/shared/entities/uuid/uuid';
import { PrismaClient } from '@prisma/client';
export const createInterval = async (service_id:string , start:Date, end:Date ,prisma:PrismaClient)=>{
    return await prisma.intervalDateAvailable.create({
        data:{
            id:Uuid.create().value,
            intial_date:start,
            final_date:end,
            service_id:service_id
        }
    })
}