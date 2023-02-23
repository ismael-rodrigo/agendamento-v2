import { EmailServiceSESImplementation } from '../../external/email-service/aws-ses-implementation';
import { ConfigSchedulePrismaRepository } from './../../external/repository/configs-repository/configs-schedule-prisma';
import { prisma } from './../../external/prisma-client/client';
import { CreateScheduleController } from '@domain/schedule/http/create-schedule-controller';
import { ScheduleRepositoryPrisma } from '../../external/repository/schedule/schedule-repository-prisma';
import { CommomUserPrismaRepository } from '../../external/repository/common-user/common-user-repository-prisma';
import { ServicePrismaRepository } from '../../external/repository/service/service-repository-prisma';
import { HoursPrismaRepository } from '../../external/repository/hours/hours-repository-prisma';
import { CreateSchedule } from '@domain/schedule/use-case/setup-schedule/setup-schedule';



export const makeScheduleController = ():CreateScheduleController =>{
    const scheduleRepo = new ScheduleRepositoryPrisma(prisma)
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const serviceRepo = new ServicePrismaRepository(prisma)
    const hoursRepo = new HoursPrismaRepository(prisma)
    const configRepo = new ConfigSchedulePrismaRepository(prisma)
    const aws = new EmailServiceSESImplementation()

    const createScheduleUseCase = new CreateSchedule(
        configRepo,
        scheduleRepo,
        commonUserRepo,
        serviceRepo, 
        hoursRepo ,
        aws
        )

    return new CreateScheduleController(createScheduleUseCase)
}