import { PrismaClient } from '@prisma/client'
import { ServiceData } from '../../../../entities/service/service-data'
import { Either, Left, Right } from '../../../../errors-handler/either'
import { DbGenericError } from '../../../../errors-handler/errors/db-generic-error'
import {IServiceRepository} from './service-repository.interface'


export class ServicePrismaRepository implements IServiceRepository {
    constructor(private client:PrismaClient){}
    
    async findServiceById(service_id: string): Promise<Either<DbGenericError, ServiceData | null>> {
        try {
            const service = await this.client.service.findUnique( { where: { id:service_id } } )
            return Right.create(service)
        }
        catch (err){
            return Left.create(new DbGenericError)
        }
    }
}