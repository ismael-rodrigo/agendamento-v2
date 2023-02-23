import { addHours } from 'date-fns';
import { addMinutes } from 'date-fns';
import { IntervalDateAvailableData } from '../intervalAvailable/interval-data';
import { ServiceData } from '../service/service-data';
import { HourAvailableData } from '../hours/hours-data';
import { describe, expect, it } from "vitest";
import { getFutureDate, getOldDate } from "../../../../tests/utils/get-dates";
import { InvalidParamsError } from "../../../shared/errors-handler/errors/invalid-params-error";
import { Schedule } from "./schedule";
import { CreateScheduleData } from "./schedule-data";

describe('Create schedule entity' , ()=>{
    describe('new schedule with valid params', ()=>{

        it('should be able create new schedule with valid params', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourValid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'123',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'123',
                id:'888'
            }

            const validParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourValid,
                service: serviceValid,
                user_id: '1231123-1212-1232-1231232',
                intervalAvailable:intervalValid
            }
            const schedule = Schedule.create(validParams)
            expect(schedule.isLeft()).toEqual(false)
            if(schedule.isLeft()) return
            
            // expect(schedule.value.date).toEqual(addMinutes(addHours(validParams.date, hourValid.hour), hourValid.minutes))
            expect(schedule.value.hour_id).toEqual(validParams.hour.id)
            expect(schedule.value.service_id).toEqual(validParams.service.id)
            expect(schedule.value.user_id).toEqual(validParams.user_id)
            
        })

        
    })


    describe('new schedule with invalid params' ,()=>{
        it('should not be able create a schedule with unlike Services Ids in between hour and service ', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourValid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'321',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'123',
                id:'888'
            }

            const invalidParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourValid,
                service: serviceValid,
                user_id: '1231123-1212-1232-1231232',
                intervalAvailable:intervalValid
            }
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })

        it('should not be able create a schedule with unlike Services Ids in between interval and service ', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourValid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'123',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'231',
                id:'888'
            }

            const invalidParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourValid,
                service: serviceValid,
                user_id: '1231123-1212-1232-1231232',
                intervalAvailable:intervalValid
            }
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })
        it('should not be able create a schedule with invalid Service Id', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourValid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'123',
                id:'888'
            }

            const invalidParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourValid,
                service: serviceValid,
                user_id: '1231123-1212-1232-1231232',
                intervalAvailable:intervalValid
            }
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })

        it('should not be able create a schedule with invalid User Id', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourValid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'123',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'123',
                id:'888'
            }

            const invalidParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourValid,
                service: serviceValid,
                user_id: '',
                intervalAvailable:intervalValid
            }
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })
        it('should not be able create a schedule with invalid Hour ', ()=>{
            const scheduleDate = getFutureDate('2022-03-10')
            const hourInvalid:HourAvailableData = {
                hour:10,
                minutes:10,
                service_id:'321',
                id:'777'
            }
            const serviceValid:ServiceData = {
                service_name:'RG',
                id:'123',
                location_id:'123'
            }
            const intervalValid:IntervalDateAvailableData = {
                final_date: getFutureDate('2022-03-20'),
                intial_date: getFutureDate('2022-03-02'),
                service_id:'123',
                id:'888'
            }

            const invalidParams:CreateScheduleData = {
                date: scheduleDate,
                hour: hourInvalid,
                service: serviceValid,
                user_id: '1231123-1212-1232-1231232',
                intervalAvailable:intervalValid
            }
    
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })

        it('should not be able create a schedule with object null', ()=>{
            const nullableObject = {}
            const schedule = Schedule.create(nullableObject as CreateScheduleData)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })

    })

})