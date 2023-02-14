import { prisma } from './../../external/prisma-client/client';
import { ServicePrismaRepository } from './../../external/repository/service/service-repository-prisma';
import { FindServicesOfLocation } from '../../modules/schedule/domain/use-case/find-services-of-location/find-services-of-location';
import { FindServicesOfLocationController } from './../../modules/schedule/http/rest/find-services-of-locations-controller';

export const makeFindServicesOfLocationController = ():FindServicesOfLocationController =>{
    const serviceRepo = new ServicePrismaRepository(prisma)
    const findServicesOfLocation = new FindServicesOfLocation(serviceRepo)
    return new FindServicesOfLocationController(findServicesOfLocation)
}