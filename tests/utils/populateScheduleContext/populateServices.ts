import { Service } from '@domain/_entities/service/service';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../src/shared/errors-handler/errors/app-error';

export const createService = async ( location_id:string , prisma:PrismaClient )=>{
    const serviceOrError = Service.create( { service_name:'RG' , location_id:location_id } )
    if(serviceOrError.isLeft()) throw new AppError('','')

    
    const saveService = await prisma.service.create({ data:serviceOrError.value.value })
    return saveService
}