import { ConfigSchedulePrismaRepository } from '@external/repository/configs-repository/configs-schedule-prisma';
import { HoursPrismaRepository } from '@external/repository/hours/hours-repository-prisma';
import { prisma } from '@external/prisma-client/client';
import { ScheduleRepositoryPrisma } from '@external/repository/schedule/schedule-repository-prisma';
import { FindDatesAvailableController } from '@domain/schedule/http/find-dates-available-controller';
import { FindDatesAvailableUseCase } from '@domain/schedule/use-case/find-dates-availables/find-dates-availables';


export const makeFindDatesAvailableController = ():FindDatesAvailableController => {
    const scheduleRepository = new ScheduleRepositoryPrisma(prisma)
    const hoursRepository = new HoursPrismaRepository(prisma)
    const configsRepo = new ConfigSchedulePrismaRepository(prisma)
    const findDatesAvailable = new FindDatesAvailableUseCase(scheduleRepository ,hoursRepository ,configsRepo )
    return new FindDatesAvailableController(findDatesAvailable)
}