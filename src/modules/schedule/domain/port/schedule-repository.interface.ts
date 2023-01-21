import { IntervalDateAvailable } from "@prisma/client";
import { Schedule } from "../entity/schedule/schedule";
import { ScheduleData } from "../entity/schedule/schedule-data";
import { Either } from "../../../../errors-handler/either";
import { DbGenericError } from "../../../../errors-handler/errors/db-generic-error";

export interface IScheduleRepository {
    findCurrentIntervalSchedulesAvailable(service_id:string): Promise <Either< DbGenericError, IntervalDateAvailable | null>>
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise <ScheduleData[]>
    findUserScheduleInDate(date_consulted: Date , user_id:string):Promise <Either<DbGenericError ,ScheduleData | null>>
    findSpecificSchedule(service_id: string, date_consulted: Date , hour_id:string):Promise <Either<DbGenericError , ScheduleData | null>>
    createSchedule(params:Schedule): Promise< Either< DbGenericError , ScheduleData>>
}

