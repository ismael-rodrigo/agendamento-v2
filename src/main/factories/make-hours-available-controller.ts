
import { FindHoursAvailableController } from '@domain/schedule/http/find-hours-available-controller';
import { FindHoursByDateServiceAvailableUseCase } from '@domain/schedule/use-case/find-hours-availabe/find-hours-availabe';
import { prisma } from '@external/prisma-client/client';
import { HoursPrismaRepository } from '@external/repository/hours/hours-repository-prisma';


export const makeHoursAvailableController = (): FindHoursAvailableController=>{
    const hoursRepo = new HoursPrismaRepository(prisma)
    const findHoursByDateServiceAvailableUseCase = new FindHoursByDateServiceAvailableUseCase(hoursRepo)
    return new FindHoursAvailableController(findHoursByDateServiceAvailableUseCase)
}