import { Uuid } from './../../../src/shared/entities/uuid';
import { PrismaClient } from '@prisma/client';

export const  createLocation = async (prisma:PrismaClient) =>{

    const locationCreated = await prisma.location.create({
        data:{
            address:'address',
            id:Uuid.create().value,
            name:'Casa do cidadao'
        }
    })
    return locationCreated
}

