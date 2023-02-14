import { prisma } from './../../external/prisma-client/client';
import { LocationPrismaRepository } from './../../external/repository/location-repository-prisma';
import { FindLocations } from './../../modules/schedule/domain/use-case/find-locations/find-locations';
import { FindLocationsController } from './../../modules/schedule/http/rest/find-locations-controller';
export const makeFindLocationsController = ():FindLocationsController =>{
    const locationsRepository = new LocationPrismaRepository(prisma)
    const findLocationsUseCase = new FindLocations(locationsRepository)
    return new FindLocationsController(findLocationsUseCase)
}