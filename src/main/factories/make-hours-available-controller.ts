
import { prisma } from './../../external/prisma-client/client';
import { FindHoursByDateServiceAvailableUseCase } from '../../modules/schedule/domain/use-case/find-hours-availabe/find-hours-availabe';
import { FindHoursAvailableController } from './../../modules/schedule/http/rest/find-hours-available-controller';
import { HoursPrismaRepository } from '../../external/repository/hours/hours-repository-prisma';

export const makeHoursAvailableController = (): FindHoursAvailableController=>{

    const hoursRepo = new HoursPrismaRepository(prisma)
    const findHoursByDateServiceAvailableUseCase = new FindHoursByDateServiceAvailableUseCase(hoursRepo)

    return new FindHoursAvailableController(findHoursByDateServiceAvailableUseCase)
}