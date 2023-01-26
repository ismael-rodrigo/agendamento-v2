import { PrismaClient } from '@prisma/client'
import { ServiceData } from '../../../modules/schedule/domain/entity/service/service-data'
import { IServiceRepository } from '../../../modules/schedule/domain/port/repository/service-repository.interface'
import { Either, Left, Right } from '../../../shared/errors-handler/either'
import { DbGenericError } from '../../../shared/errors-handler/errors/db-generic-error'




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