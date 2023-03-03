import { PrismaClient } from '@prisma/client'
import { ServiceData } from '@domain/_entities/service/service-data'
import { IServiceRepository } from '@domain/_ports/repository/service-repository.interface'
import { Either, Left, Right } from '@shared/errors-handler/either'
import { DbGenericError } from '@shared/errors-handler/errors/db-generic-error'
import { FindServicesRequest } from '@domain/admin/use-case/find-services/find-services-DTO'




export class ServicePrismaRepository implements IServiceRepository {
    constructor(private client:PrismaClient){}
    async query({service_id , location_id}: FindServicesRequest): Promise<Either<DbGenericError, ServiceData[]>> {
        try{
            const result = await this.client.service.findMany({
                where:{
                    id:service_id,
                    location_id:location_id
                }
            })
            return Right.create(result)
        }
        catch(err ){
            return Left.create(new DbGenericError('ServicePrismaRepository.query'))
        }
    }

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