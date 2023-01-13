import { describe, expect, it } from "vitest";
import { InvalidParamsError } from "../../errors-handler/errors/invalid-params-error";
import { getOldDate } from "../../tests/utils/get-dates";
import { Schedule } from "./schedule";
import { CreateScheduleData } from "./schedule-data";

describe('Create schedule entity' , ()=>{
    describe('new schedule with valid params', ()=>{
        it('should be able create new schedule with valid params', ()=>{
            const validParams:CreateScheduleData = {
                date:new Date(),
                hour_id:'1231123-1212-1232-1231232',
                service_id:'1231123-1212-1232-1231232',
                user_id:'1231123-1212-1232-1231232'
            }
    
            const schedule = Schedule.create(validParams)
            expect(schedule.isLeft()).toEqual(false)
            if(schedule.isLeft()) return
            expect(schedule.value.valueObject().date).toEqual(validParams.date)
            expect(schedule.value.valueObject().hour_id).toEqual(validParams.hour_id)
            expect(schedule.value.valueObject().service_id).toEqual(validParams.service_id)
            expect(schedule.value.valueObject().user_id).toEqual(validParams.user_id)
            
        })

        
    })


    describe('new schedule with invalid params' ,()=>{
        it('should not be able create a schedule with date before nowh', ()=>{
            const invalidParams:CreateScheduleData = {
                date:getOldDate(1),
                hour_id:'1231123-1212-1232-1231232',
                service_id:'1231123-1212-1232-1231232',
                user_id:'1231123-1212-1232-1231232'
            }
    
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })

        it('should not be able create a schedule with invalid Service Id', ()=>{
            const invalidParams:CreateScheduleData = {
                date:new Date,
                hour_id:'1231123-1212-1232-1231232',
                service_id:'',
                user_id:'1231123-1212-1232-1231232'
            }
    
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })
        it('should not be able create a schedule with invalid User Id', ()=>{
            const invalidParams:CreateScheduleData = {
                date:new Date,
                hour_id:'1231123-1212-1232-1231232',
                service_id:'1231123-1212-1232-1231232',
                user_id:''
            }
    
            const schedule = Schedule.create(invalidParams)
            expect(schedule.isLeft()).toEqual(true)
            if(!schedule.isLeft()) return
            expect(schedule.error).instanceOf(InvalidParamsError)
        })
        it('should not be able create a schedule with invalid Hour Id', ()=>{
            const invalidParams:CreateScheduleData = {
                date:new Date,
                hour_id:'',
                service_id:'1231123-1212-1232-1231232',
                user_id:'1231123-1212-1232-1231232'
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