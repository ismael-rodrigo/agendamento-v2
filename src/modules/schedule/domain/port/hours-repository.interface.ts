import { HoursData } from "../entity/hours/hours-data";
import { Either } from "../../../../errors-handler/either";
import { DbGenericError } from "../../../../errors-handler/errors/db-generic-error";

export interface IHoursRepository {
    findHoursById(hours_id:string):Promise < Either<DbGenericError , HoursData | null> >
    findHoursAvailableInDate(service_id: string, date_consulted: Date ): Promise <Either <DbGenericError , HoursData[]>>
    findAllHoursInDate(service_id: string, date_consulted: Date): Promise <Either <DbGenericError , HoursData[]>>

}