import { PrismaClient } from '@prisma/client';
import { Service } from "../../../src/modules/schedule/domain/entity/service/service"
import { AppError } from '../../../src/shared/errors-handler/errors/app-error';

export const createService = async ( location_id:string , prisma:PrismaClient )=>{
    const serviceOrError = Service.create( { service_name:'RG' , location_id:location_id } )
    if(serviceOrError.isLeft()) throw new AppError('','')

    
    const saveService = await prisma.service.create({ data:serviceOrError.value.value })
    return saveService
}