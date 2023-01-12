import { HourAvailable, IntervalDateAvailable, Schedule } from "@prisma/client";
import { VerifyHoursAvailableDTO } from "../../use-cases/find-hours-availabe/find-hours-available-DTO";

export interface IScheduleRepository {
    findCurrentIntervalSchedulesAvailable(service_id:string): Promise <IntervalDateAvailable | null>
    findHoursAvailableOfService( params:VerifyHoursAvailableDTO.request ): Promise <HourAvailable[]>
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise <Schedule[]>
    findAllHoursAvailableByServiceId(service_id: string, date_consulted: Date): Promise <HourAvailable[]>


    

}