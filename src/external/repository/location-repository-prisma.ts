import { Right, Left } from '@shared/errors-handler/either';
import { PrismaClient } from '@prisma/client';
import { LocationData } from '@domain/_entities/location/location-data';
import { Either } from '@shared/errors-handler/either';
import { DbGenericError } from '@shared/errors-handler/errors/db-generic-error';
import { ILocationsRepository } from '@domain/_ports/repository/locations-repository.interface';

export class LocationPrismaRepository implements ILocationsRepository {
    constructor(private readonly prisma:PrismaClient){}
    async add({ id , address , name }: LocationData): Promise<Either<DbGenericError, LocationData>> {
        try{
            const result = await this.prisma.location.create({
                data:{
                    id , 
                    address , 
                    name
                }
            })
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('LocationPrismaRepository.add'))
        }
    }
    async findMany(): Promise<Either<DbGenericError, LocationData[]>> {
        try{
            const result = await this.prisma.location.findMany()
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('LocationPrismaRepository.findMany'))
        }
    }

}