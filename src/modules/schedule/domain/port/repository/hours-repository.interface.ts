import { Either } from "../../../../../shared/errors-handler/either";
import { DbGenericError } from "../../../../../shared/errors-handler/errors/db-generic-error";
import { HoursData } from "../../entity/hours/hours-data";


export interface IHoursRepository {
    findHoursById(hours_id:string):Promise < Either<DbGenericError , HoursData | null> >
    findHoursAvailableInDate(service_id: string, date_consulted: Date ): Promise <Either <DbGenericError , HoursData[]>>
    findAllHoursInDate(service_id: string, date_consulted: Date): Promise <Either <DbGenericError , HoursData[]>>

}