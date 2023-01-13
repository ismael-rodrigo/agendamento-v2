import { HourAvailable, IntervalDateAvailable } from "@prisma/client";
import { Schedule } from "../../../../entities/schedule/schedule";
import { ScheduleData } from "../../../../entities/schedule/schedule-data";
import { AppError } from "../../../../errors-handler/app-error";
import { Either } from "../../../../errors-handler/either";
import { VerifyHoursAvailableDTO } from "../../use-cases/find-hours-availabe/find-hours-available-DTO";

export interface IScheduleRepository {
    findCurrentIntervalSchedulesAvailable(service_id:string): Promise <IntervalDateAvailable | null>
    findHoursAvailableOfService( params:VerifyHoursAvailableDTO.request ): Promise <HourAvailable[]>
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise <ScheduleData[]>
    findAllHoursAvailableByServiceId(service_id: string, date_consulted: Date): Promise <HourAvailable[]>
     


    createSchedule(params:Schedule): Promise< Either< AppError , ScheduleData>>
}