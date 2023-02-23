import { ServiceData } from '../service/service-data';
import { HourAvailableData } from '../hours/hours-data';
import { IntervalDateAvailableData } from '../intervalAvailable/interval-data';


export interface ScheduleData {
    id :string
    user_id :string
    service_id :string
    hour_id :string
    date :Date
    created_at:Date
    updated_at:Date
}

export interface CreateScheduleData {
    id?:string
    user_id: string
    service: ServiceData
    hour: HourAvailableData
    date: Date
    intervalAvailable: IntervalDateAvailableData
}

