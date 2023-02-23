import { IntervalDateAvailable } from "@prisma/client";
import { Either } from "../../../shared/errors-handler/either";
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error";
import { Schedule } from "../../_entities/schedule/schedule";
import { ScheduleData } from "../../_entities/schedule/schedule-data";


export interface IScheduleRepository {
    findSchedulesByDateAndServiceId(service_id: string, date_consulted: Date): Promise<Either< DbGenericError , ScheduleData[]>>
    findUserScheduleInDate(date_consulted: Date , user_id:string):Promise <Either<DbGenericError ,ScheduleData | null>>
    findSpecificSchedule(service_id: string, date_consulted: Date , hour_id:string):Promise <Either<DbGenericError , ScheduleData | null>>
    createSchedule(params:Schedule): Promise< Either< DbGenericError , ScheduleData>>
}

