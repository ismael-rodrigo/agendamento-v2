import { IntervalDateAvailable } from './../../entity/intervalAvailable/interval-available';
import { Schedule } from './../../entity/schedule/schedule';
import { CommomUser } from './../../entity/common-user/common-user';
import { Service } from './../../entity/service/service';
import { HourAvailable } from './../../entity/hours/hour-available';
import { describe, expect, it ,beforeEach } from "vitest";
import { getFutureDate, getOldDate } from '../../../../../../tests/utils/get-dates';

describe('Create schedule use case test',()=>{
    let service = Service.create({
        service_name:'RG'
    })
    expect(service.isLeft()).toEqual(false)
    if(service.isLeft()) return
    
    let hourScheduleAvailable = HourAvailable.create({
        hour:10,
        minutes:10,
        service_id:service.value.id.value
    })
    expect(hourScheduleAvailable.isLeft()).toEqual(false)
    if(hourScheduleAvailable.isLeft()) return

    let userUnScheduled = CommomUser.create({
        cpf:'07328011335',
        name:'ismael Rodrigo',
        phone_number:'85981050647',
        date_birth: getOldDate(10)
    })    
    expect(userUnScheduled.isLeft()).toEqual(false)
    if(userUnScheduled.isLeft()) return

    let interval = IntervalDateAvailable.create({
        intial_date:getFutureDate('2022-01-10'),
        final_date:getFutureDate('2022-01-20'),
        service_id:service.value.id.value,
    })


    describe('should be create new schedule with valid params',()=>{
        beforeEach(()=>{
            
        })
        it('should be create new schedule with valid arguments' , ()=>{

        })
    })

})