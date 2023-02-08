import { prisma } from './../../external/prisma-client/client';
import { CreateSchedule } from '../../modules/schedule/domain/use-case/creates/setup-schedule/setup-schedule';
import { CreateScheduleController } from './../../modules/schedule/http/rest/create-schedule-controller';
import { CommomUserPrismaRepository } from '../../external/repository/common-user/common-user-repository-prisma';
import { ScheduleRepositoryPrisma } from '../../external/repository/schedule/schedule-repository-prisma';
import { ServicePrismaRepository } from '../../external/repository/service/service-repository-prisma';
import { HoursPrismaRepository } from '../../external/repository/hours/hours-repository-prisma'


export const makeScheduleController = ():CreateScheduleController =>{
    const scheduleRepo = new ScheduleRepositoryPrisma(prisma)
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const serviceRepo = new ServicePrismaRepository(prisma)
    const hoursRepo = new HoursPrismaRepository(prisma)

    const createScheduleUseCase = new CreateSchedule(
        scheduleRepo,
        commonUserRepo,
        serviceRepo, 
        hoursRepo 
        )

    return new CreateScheduleController(createScheduleUseCase)
}