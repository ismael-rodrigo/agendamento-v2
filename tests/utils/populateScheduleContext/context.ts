import { DayDisabledData } from './../../../src/modules/schedule/domain/entity/day-disabled/day-disabled-data';
import { DateDisabledData } from './../../../src/modules/schedule/domain/entity/date-disabled/date-disabled-data';
import { DayDisabled } from './../../../src/modules/schedule/domain/entity/day-disabled/day-disabled';
import { createDateDisabled } from './populateDateDisabled';
import { createDayDisabled } from './populateDayDisabled';
import { createUser } from './populateUsers';
import { createInterval } from './populateIntervals';
import { createService } from './populateServices';
import { CommomUser, HourAvailable, IntervalDateAvailable, Location, PrismaClient, Service } from '@prisma/client';
import { createLocation } from './populateLocation';
import { getFutureDate } from '../get-dates';
import { createHour } from './populateHoursAvailable';




export const contextSchedule = async (prisma:PrismaClient)=>{

    const location = await createLocation(prisma)

    const service1 = await createService(location.id , prisma)
    const service2 = await createService(location.id , prisma)

    const intervalOfTheService1 = await createInterval(service1.id , getFutureDate('2022-05-02'), getFutureDate('2022-05-20') , prisma)
    const dayDisabledService1 = await createDayDisabled(service1.id , 0 , prisma)
    const dayDisabled2Service1 = await createDayDisabled(service1.id , 5 , prisma)

    const dateDisabledService1 = await createDateDisabled(service1.id , getFutureDate('2022-05-10') , prisma)
    const dateDisabled2Service1 = await createDateDisabled(service1.id , getFutureDate('2022-05-13') , prisma)

    const intervalOfTheService2 = await createInterval(service2.id , getFutureDate('2022-05-10'), getFutureDate('2022-05-25') , prisma)


    const hoursAvailableOfTheService1 = await createHour(service1.id , 10 , 12 , prisma)
    const hoursAvailable2OfTheService1 = await createHour(service1.id , 12 , 20 , prisma)

    const hoursAvailableOfTheService2 = await createHour(service2.id , 9 , 40 , prisma)
    const hoursAvailable2OfTheService2 = await createHour(service2.id , 14 , 10 , prisma)

    const user1 = await createUser(prisma)
    const user2 = await createUser(prisma)
    const user3 = await createUser(prisma)

    return {
        location,
        service1,
        service2,
        intervalOfTheService1,
        intervalOfTheService2,
        hoursAvailableOfTheService1,
        hoursAvailable2OfTheService1,
        hoursAvailableOfTheService2,
        hoursAvailable2OfTheService2,
        user1,
        user2,
        user3,
        dayDisabledService1 ,
        dayDisabled2Service1 ,
        dateDisabledService1 ,
        dateDisabled2Service1
    }


}

export interface ContextSchedule {
    location: Location
    service1: Service
    service2: Service
    intervalOfTheService1: IntervalDateAvailable
    intervalOfTheService2: IntervalDateAvailable
    hoursAvailableOfTheService1: HourAvailable
    hoursAvailable2OfTheService1: HourAvailable
    hoursAvailableOfTheService2: HourAvailable
    hoursAvailable2OfTheService2: HourAvailable
    user1: CommomUser
    user2: CommomUser
    user3: CommomUser
    dayDisabledService1 :DayDisabledData
    dayDisabled2Service1 :DayDisabledData
    dateDisabledService1 :DateDisabledData
    dateDisabled2Service1:DateDisabledData
}