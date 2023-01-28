import { AppError } from './../../../../../shared/errors-handler/errors/app-error';
import { addHours } from 'date-fns';
import { addMinutes } from 'date-fns';
import { Location } from './../../entity/location/location';
import { HoursPrismaRepository } from './../../../../../external/repository/hours/hours-repository-prisma';
import { ServicePrismaRepository } from './../../../../../external/repository/service/service-repository-prisma';
import { CommomUserPrismaRepository } from './../../../../../external/repository/common-user/common-user-repository-prisma';
import { prismaMocked } from './../../../../../../prisma/__mocks__/index';
import { ScheduleRepositoryPrisma } from './../../../../../external/repository/schedule/schedule-repository-prisma';
import { CreateSchedule } from './create-schedule';
import { IntervalDateAvailable } from './../../entity/intervalAvailable/interval-available';
import { CommomUser } from './../../entity/common-user/common-user';
import { Service } from './../../entity/service/service';
import { HourAvailable } from './../../entity/hours/hour-available';
import { describe, expect, it ,beforeEach } from "vitest";
import { getFutureDate, getOldDate } from '../../../../../../tests/utils/get-dates';

describe('Create schedule use case test',()=>{



    describe('should be create new schedule with valid params',()=>{
        let sut:CreateSchedule
        let service:Service
        let hourScheduleAvailable:HourAvailable
        let userUnScheduled:CommomUser
        let userUnScheduled2:CommomUser
        let intervalAvailable:IntervalDateAvailable
        let location:Location
        beforeEach(async()=>{

            const prisma = prismaMocked

            const schedRepo = new ScheduleRepositoryPrisma(prisma) 
            const commonUserRepo = new CommomUserPrismaRepository(prisma) 
            const serviceRepo =  new ServicePrismaRepository(prisma)
            const hourRepo = new HoursPrismaRepository(prisma)

            sut = new CreateSchedule( schedRepo , commonUserRepo , serviceRepo , hourRepo )

            const locationOrError = Location.create({address:'Capital'})
            expect(locationOrError.isLeft()).toEqual(false)
            if(locationOrError.isLeft()) return
            location = locationOrError.value

            await prisma.location.create({
                data:location.value
            })


            const serviceOrError = Service.create( { service_name:'RG' ,location_id:location.id.value } )
            expect(serviceOrError.isLeft()).toEqual(false)
            if(serviceOrError.isLeft()) return
            service = serviceOrError.value
            
            const saveService = await serviceRepo.add(service.value)
            expect(saveService.isLeft()).toEqual(false)
            if(saveService.isLeft()) return


            const hourScheduleAvailableOrError = HourAvailable.create({
                hour:10,
                minutes:10,
                service_id:service.id.value
            })
    
            expect(hourScheduleAvailableOrError.isLeft()).toEqual(false)
            if(hourScheduleAvailableOrError.isLeft()) return
            hourScheduleAvailable = hourScheduleAvailableOrError.value
            const saveHour = await hourRepo.add(hourScheduleAvailable.value)
            expect(saveHour.isLeft()).toEqual(false)
            if(saveHour.isLeft()) return

            const userUnScheduledOrError = CommomUser.create({
                cpf:'07328011335',
                name:'ismael Rodrigo',
                phone_number:'85981050647',
                date_birth: getOldDate(10)
            })    


            expect(userUnScheduledOrError.isLeft()).toEqual(false)
            if(userUnScheduledOrError.isLeft()) return
            userUnScheduled = userUnScheduledOrError.value

            const userUnScheduledOrError2 = CommomUser.create({
                cpf:'58089497349',
                name:'Samuel Conrrado',
                phone_number:'85981050647',
                date_birth: getOldDate(10)
            })    


            expect(userUnScheduledOrError2.isLeft()).toEqual(false)
            if(userUnScheduledOrError2.isLeft()) return
            userUnScheduled2 = userUnScheduledOrError2.value

            await prisma.commomUser.createMany({
                data:[ userUnScheduled.value , userUnScheduled2.value ]
            })


            const intervalOrError = IntervalDateAvailable.create({
                intial_date:getFutureDate('2022-01-10'),
                final_date:getFutureDate('2022-01-20'),
                service_id:service.id.value,
            })
            expect(intervalOrError.isLeft()).toEqual(false)
            if(intervalOrError.isLeft()) return
            intervalAvailable = intervalOrError.value

            await prisma.intervalDateAvailable.create({
                data:intervalAvailable.value
            })

        })



        it('should be create schedule with valid arguments' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const result = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })

            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect(result.value.date).toEqual(addMinutes(addHours(dateSched , hourScheduleAvailable.hour.value) , hourScheduleAvailable.minutes.value))
            
        })

        it('should not be create schedule with date after to date limit available' , async ()=>{
            const dateSched = getFutureDate('2022-01-21')

            const result = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create schedule with date before to date limit available' , async ()=>{
            const dateSched = getFutureDate('2022-01-05')

            const result = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
        })

        it('should not be create schedule with hourID not valid' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const result = await sut.execute({
                date:dateSched,
                hour_id:"invalid-id",
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })
        it('should not be create schedule with serviceID not valid' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const result = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:"service-id-invalid",
                user_id:userUnScheduled.id.value
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create schedule with userID not valid' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const result = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:"user-id-invalid"
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).toBeInstanceOf(AppError)
            
        })

        it('should not be create duplicate schedule on equal date,service and hour with diferents users' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const schedule1 = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })
            expect(schedule1.isLeft()).toEqual(false)
            if(schedule1.isLeft()) return

            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled2.id.value
            })

            expect(schedule2.isLeft()).toEqual(true)
            if(!schedule2.isLeft()) return
            expect(schedule2.error).toBeInstanceOf(AppError)

        })

        it('should not be possible for a user to have two appointments for the same day' , async ()=>{
            const dateSched = getFutureDate('2022-01-15')

            const schedule1 = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })
            expect(schedule1.isLeft()).toEqual(false)
            if(schedule1.isLeft()) return

            const schedule2 = await sut.execute({
                date:dateSched,
                hour_id:hourScheduleAvailable.id.value,
                service_id:service.id.value,
                user_id:userUnScheduled.id.value
            })

            expect(schedule2.isLeft()).toEqual(true)
            if(!schedule2.isLeft()) return
            expect(schedule2.error).toBeInstanceOf(AppError)

        })

    })

})