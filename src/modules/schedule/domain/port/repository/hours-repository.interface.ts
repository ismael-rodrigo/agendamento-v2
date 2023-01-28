
import { HourAvailableData } from './../../entity/hours/hours-data';
import { Either } from "../../../../../shared/errors-handler/either";
import { DbGenericError } from "../../../../../shared/errors-handler/errors/db-generic-error";



export interface IHoursRepository {

    add(data:HourAvailableData):Promise < Either<DbGenericError , HourAvailableData> >

    findHoursById(hours_id:string):Promise < Either<DbGenericError , HourAvailableData | null> >
    findHoursAvailableInDate(service_id: string, date_consulted: Date ): Promise <Either <DbGenericError , HourAvailableData[]>>
    findAllHoursInDate(service_id: string, date_consulted: Date): Promise <Either <DbGenericError , HourAvailableData[]>>

}