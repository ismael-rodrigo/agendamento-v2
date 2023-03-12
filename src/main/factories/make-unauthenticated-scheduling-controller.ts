import { CreateUnauthenticatedSchedule } from './../../domain/schedule/use-case/unauthenticated-scheduling/unauthenticated-scheduling';
import { UnauthenticatedUserRepositoryPrisma } from './../../external/repository/unauthenticated-user-repository/unauthenticated-user-repository-prisma';
import { CreateUnauthenticatedScheduleController } from './../../domain/schedule/http/create-unauthenticated-scheduling-controller';
import { prisma } from '@external/prisma-client/client';
import { ConfigSchedulePrismaRepository } from '@external/repository/configs-repository/configs-schedule-prisma';
import { HoursPrismaRepository } from '@external/repository/hours/hours-repository-prisma';
import { ServicePrismaRepository } from '@external/repository/service/service-repository-prisma';
import { ScheduleRepositoryPrisma } from '@external/repository/schedule/schedule-repository-prisma';

export const makeUnauthenticatedSchedulingController = (): CreateUnauthenticatedScheduleController => {
    const scheduleRepo = new ScheduleRepositoryPrisma(prisma)
    const UnautUserRepo = new UnauthenticatedUserRepositoryPrisma(prisma)
    const serviceRepo = new ServicePrismaRepository(prisma)
    const hoursRepo = new HoursPrismaRepository(prisma)
    const configRepo = new ConfigSchedulePrismaRepository(prisma)
    const useCase = new CreateUnauthenticatedSchedule(configRepo , scheduleRepo ,serviceRepo,hoursRepo,UnautUserRepo)
    return new CreateUnauthenticatedScheduleController(useCase)
}