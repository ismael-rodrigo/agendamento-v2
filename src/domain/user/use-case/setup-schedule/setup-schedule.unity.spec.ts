import { EmailServiceSESImplementation } from '../../../../external/email-service/aws-ses-implementation';
import { ConfigSchedulePrismaRepository } from '@external/repository/configs-repository/configs-schedule-prisma';
import { PrismaClient } from '@prisma/client';
import { contextSchedule, ContextSchedule } from 'tests/utils/populateScheduleContext/context';
import { HoursPrismaRepository } from '@external/repository/hours/hours-repository-prisma';
import { ServicePrismaRepository } from '@external/repository/service/service-repository-prisma';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { prismaMocked } from '../../../../../prisma/__mocks__/index';
import { ScheduleRepositoryPrisma } from '@external/repository/schedule/schedule-repository-prisma';
import { CreateSchedule } from './setup-schedule';

import { describe, expect, it ,beforeEach } from "vitest";
import { AppError } from '../../../../shared/errors-handler/errors/app-error';
import { getFutureDate } from '../../../../../tests/utils/get-dates';


describe('Create schedule use case test',()=>{


    describe('should be create new schedule with valid params',async ()=>{
        let sut:CreateSchedule

        let context:ContextSchedule
        let prisma:PrismaClient
        beforeEach(async()=>{
            prisma = prismaMocked
            context = await contextSchedule(prisma)
            const schedRepo = new ScheduleRepositoryPrisma(prisma) 
            const commonUserRepo = new CommomUserPrismaRepository(prisma) 
            const serviceRepo =  new ServicePrismaRepository(prisma)
            const hourRepo = new HoursPrismaRepository(prisma)
            const configScheduleRepo = new ConfigSchedulePrismaRepository(prisma)
            const emailService = new EmailServiceSESImplementation()

            sut = new CreateSchedule( 
                configScheduleRepo , 
                schedRepo , 
                commonUserRepo , 
                serviceRepo , 
                hourRepo ,
                emailService)
        })



        it('should be create schedule with valid arguments' , async ()=>{
            const dateSched = getFutureDate('2022-05-10')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(1)
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(dateSched)

        })

        it('should be create schedules to equal date with unlike hours and users' , async ()=>{
            const dateSched = getFutureDate('2022-05-10')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            console.log(result)

            expect(await prisma.schedule.count()).toEqual(1)
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(dateSched)

            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailable2OfTheService1.id,
                service_id: context.service1.id,
                user_id: context.user2.id
            })

            expect(await prisma.schedule.count()).toEqual(2)
            expect(schedule2.isLeft()).toEqual(false)
            if(schedule2.isLeft()) return
            
        })

        it('should be create schedules to equal date with other service and users' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(1)
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(dateSched)

            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService2.id,
                service_id: context.service2.id,
                user_id: context.user2.id
            })

            expect(await prisma.schedule.count()).toEqual(2)
            expect(schedule2.isLeft()).toEqual(false)
            if(schedule2.isLeft()) return
            
        })



        
        it('should be create schedule with date equal as limit available (start date)' , async ()=>{
            const dateSched = getFutureDate('2022-05-02')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(1)
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(dateSched)

        })

        it('should be create schedule with date equal as limit available (end date)' , async ()=>{
            const dateSched = getFutureDate('2022-05-20')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(1)
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(dateSched)

        })
        

        it('should not be create schedule with date before to start date limit available' , async ()=>{
            const dateSched = getFutureDate('2022-05-01')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(0)
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create schedule with date after to end date limit available' , async ()=>{
            const dateSched = getFutureDate('2022-05-21')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(0)
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
        })

        it('should not be create schedule with hourID different from the serviceID provided' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService2.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(0)
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create schedule with serviceID invalid' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: "service-id-invalid" ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(0)
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create schedule with userID invalid' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')
            expect(await prisma.schedule.count()).toEqual(0)
            const result = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: "user-invalid-id"
            })
            expect(await prisma.schedule.count()).toEqual(0)
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be user create two schedule on the same day' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')

            expect(await prisma.schedule.count()).toEqual(0)
            const schedule1 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })
            expect(await prisma.schedule.count()).toEqual(1)
            expect(schedule1.isLeft()).toEqual(false)
            if(schedule1.isLeft()) return


            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailable2OfTheService1.id,
                service_id: context.service1.id,
                user_id: context.user1.id
            })

            expect(await prisma.schedule.count()).toEqual(1)
            expect(schedule2.isLeft()).toEqual(true)
            if(!schedule2.isLeft()) return
            expect(schedule2.error).toBeInstanceOf(AppError)
        })

        it('should not be create duplicate schedule' , async ()=>{
            const dateSched = getFutureDate('2022-05-15')

            expect(await prisma.schedule.count()).toEqual(0)
            const schedule1 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id ,
                user_id: context.user1.id
            })

            expect(await prisma.schedule.count()).toEqual(1)
            expect(schedule1.isLeft()).toEqual(false)
            if(schedule1.isLeft()) return

            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id: context.hoursAvailableOfTheService1.id,
                service_id: context.service1.id,
                user_id: context.user2.id
            })

            expect(await prisma.schedule.count()).toEqual(1)
            expect(schedule2.isLeft()).toEqual(true)
            if(!schedule2.isLeft()) return
            expect(schedule2.error).toBeInstanceOf(AppError)
        })



    })

}) 