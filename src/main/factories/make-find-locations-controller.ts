import { FindLocationsController } from "@domain/schedule/http/find-locations-controller"
import { FindLocations } from "@domain/schedule/use-case/find-locations/find-locations"
import { prisma } from "@external/prisma-client/client"
import { LocationPrismaRepository } from "@external/repository/location-repository-prisma"



export const makeFindLocationsController = ():FindLocationsController =>{
    const locationsRepository = new LocationPrismaRepository(prisma)
    const findLocationsUseCase = new FindLocations(locationsRepository)
    return new FindLocationsController(findLocationsUseCase)
}