import { HourAvailable, IntervalDateAvailable } from "@prisma/client";
import { Schedule } from "../../../../entities/schedule/schedule";
import { ScheduleData } from "../../../../entities/schedule/schedule-data";
import { AppError } from "../../../../errors-handler/app-error";
import { Either } from "../../../../errors-handler/either";
import { VerifyHoursAvailableDTO } from "../../use-cases/find-hours-availabe/find-hours-available-DTO";

export interface IScheduleRepository {
    findCurrentIntervalSchedulesAvailable(service_id:string): Promise <IntervalDateAvailable | null>
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise <ScheduleData[]>
    createSchedule(params:Schedule): Promise< Either< AppError , ScheduleData>>
}