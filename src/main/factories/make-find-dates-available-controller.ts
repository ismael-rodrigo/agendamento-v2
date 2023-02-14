import { ConfigSchedulePrismaRepository } from './../../external/repository/configs-repository/configs-schedule-prisma';
import { HoursPrismaRepository } from './../../external/repository/hours/hours-repository-prisma';
import { prisma } from './../../external/prisma-client/client';
import { ScheduleRepositoryPrisma } from './../../external/repository/schedule/schedule-repository-prisma';
import { FindDatesAvailableUseCase } from '../../modules/schedule/domain/use-case/find-dates-availables/find-dates-availables';
import { FindDatesAvailableController } from './../../modules/schedule/http/rest/find-dates-available-controller';

export const makeFindDatesAvailableController = ():FindDatesAvailableController => {
    const scheduleRepository = new ScheduleRepositoryPrisma(prisma)
    const hoursRepository = new HoursPrismaRepository(prisma)
    const configsRepo = new ConfigSchedulePrismaRepository(prisma)
    const findDatesAvailable = new FindDatesAvailableUseCase(scheduleRepository ,hoursRepository ,configsRepo )
    return new FindDatesAvailableController(findDatesAvailable)
}