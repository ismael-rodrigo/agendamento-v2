import { FindServicesOfLocationController } from '@domain/schedule/http/find-services-of-locations-controller';
import { FindServicesOfLocation } from '@domain/schedule/use-case/find-services-of-location/find-services-of-location';
import { prisma } from '@external/prisma-client/client';
import { ServicePrismaRepository } from '@external/repository/service/service-repository-prisma';


export const makeFindServicesOfLocationController = ():FindServicesOfLocationController =>{
    const serviceRepo = new ServicePrismaRepository(prisma)
    const findServicesOfLocation = new FindServicesOfLocation(serviceRepo)
    return new FindServicesOfLocationController(findServicesOfLocation)
}