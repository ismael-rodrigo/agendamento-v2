import { IntervalDateAvailable } from "@prisma/client";
import { Schedule } from "../../../../entities/schedule/schedule";
import { ScheduleData } from "../../../../entities/schedule/schedule-data";
import { AppError } from "../../../../errors-handler/app-error";
import { Either } from "../../../../errors-handler/either";
import { DbGenericError } from "../errors/db-generic-error";

export interface IScheduleRepository {
    findCurrentIntervalSchedulesAvailable(service_id:string): Promise <IntervalDateAvailable | null>
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise <ScheduleData[]>
    findUserScheduleInDate(date_consulted: Date , user_id:string):Promise <Either<DbGenericError ,ScheduleData | null>>
    findSpecificSchedule(service_id: string, date_consulted: Date , hour_id:string):Promise <Either<DbGenericError , ScheduleData | null>>
    createSchedule(params:Schedule): Promise< Either< DbGenericError , ScheduleData>>
}

