import { PrismaClient } from '@prisma/client'
import { CreateService, ServiceData } from '../../../modules/schedule/domain/entity/service/service-data'
import { IServiceRepository } from '../../../modules/schedule/domain/port/repository/service-repository.interface'
import { Either, Left, Right } from '../../../shared/errors-handler/either'
import { DbGenericError } from '../../../shared/errors-handler/errors/db-generic-error'




export class ServicePrismaRepository implements IServiceRepository {
    constructor(private client:PrismaClient){}

    async findServicesByLocationId(location_id: string): Promise<Either<DbGenericError, ServiceData[]>> {
        try{
            const result = await this.client.service.findMany({
                where:{
                    location_id:location_id
                }
            })
            return Right.create(result)
        }
        catch(err ){
            return Left.create(new DbGenericError('ServicePrismaRepository.findServicesByLocationId'))
        }
    }
    
    async findServiceById(service_id: string): Promise<Either<DbGenericError, ServiceData | null>> {
        try {
            const service = await this.client.service.findUnique( { where: { id:service_id } } )
            return Right.create(service)
        }
        catch (err){
            return Left.create(new DbGenericError('ServicePrismaRepository.findServiceById'))
        }
    }


    async add({ id , service_name  , location_id}: ServiceData): Promise< Either<DbGenericError, ServiceData>> {
        try{
            const result = await this.client.service.create({
                data: {
                    id,
                    service_name,
                    location_id
                }
            })

            return Right.create(result)
        }
        catch(err){
            return Left.create(new DbGenericError('ServicePrismaRepository.add'))
        }
    }
}