import { AppError } from './../../../../../shared/errors-handler/errors/app-error';
import { DateDisabledData } from './../date-disabled/date-disabled-data';
import { ScheduleData } from './../schedule/schedule-data';
import { HourAvailableData } from './../hours/hours-data';
import { DatesAvailables } from './date-available-data';

export class DateAvailable {
    private datesAvailable:DatesAvailables[]
    public error: AppError | null

    constructor(){
        this.datesAvailable = []
        this.error = null
    }

    handler(date:Date , hoursAvailable:HourAvailableData[] , scheduleCreateds:ScheduleData[] ){
        if(hoursAvailable.length > scheduleCreateds.length ) {
            this.push(date , true)
        }
        else this.push(date , false)
    }

    push(date:Date , is_available:boolean){
        this.datesAvailable.push({ date , is_available })
    }

    setError(err:AppError){
        this.error = err
    }

    get value(){
        const dates = this.datesAvailable.sort((a , b)=>{
            if(a.date > b.date) return 1
            return -1
        })
        return dates
    }


}