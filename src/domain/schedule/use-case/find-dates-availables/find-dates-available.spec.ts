import { AppError } from '@shared/errors-handler/errors/app-error';
import { expect } from 'vitest';
import { FindDatesAvailableUseCase } from './find-dates-availables';
import { PrismaClient } from '@prisma/client'
import {describe , it , beforeEach} from 'vitest'
import { prismaMocked } from 'prisma/__mocks__'
import { contextSchedule, ContextSchedule } from 'tests/utils/populateScheduleContext/context'
import { ConfigSchedulePrismaRepository } from '@external/repository/configs-repository/configs-schedule-prisma'
import { HoursPrismaRepository } from '@external/repository/hours/hours-repository-prisma'
import { ScheduleRepositoryPrisma } from '@external/repository/schedule/schedule-repository-prisma'

describe('Create schedule use case test',()=>{


    describe('should be find dates available with avaible',async ()=>{
        let sut:FindDatesAvailableUseCase

        let context:ContextSchedule
        let prisma:PrismaClient
        beforeEach(async()=>{
            prisma = prismaMocked
            context = await contextSchedule(prisma)
            const schedRepo = new ScheduleRepositoryPrisma(prisma) 
            const hourRepo = new HoursPrismaRepository(prisma)
            const configScheduleRepo = new ConfigSchedulePrismaRepository(prisma)
            sut = new FindDatesAvailableUseCase(schedRepo , hourRepo ,  configScheduleRepo)
        })

        it('should be find dates between interval initial date and final date', async ()=>{
            const result = await sut.execute({
                service_id:context.service1.id
            })
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value[0].date).toEqual(context.intervalOfTheService1.intial_date)
            expect(result.value[result.value.length - 1].date).toEqual(context.intervalOfTheService1.final_date)
            result.value.map(({date , is_available})=>{
                if(date == context.dateDisabledService1.date || date == context.dateDisabled2Service1.date){
                    expect(is_available).toEqual(false)
                }
                if(date.getDay() == context.dayDisabledService1.day || date.getDay() == context.dayDisabled2Service1.day ){
                    expect(is_available).toEqual(false)
                }
            })

        })
        it('should not be find dates available if service id not provided', async ()=>{
            const result = await sut.execute({
                service_id:"service-id-invalid"
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            console.log(result.error)

        })
    })

})