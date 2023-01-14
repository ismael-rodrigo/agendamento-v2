import { HoursData } from "../../../../entities/hours/hours-data";
import { Either } from "../../../../errors-handler/either";
import { DbGenericError } from "../errors/db-generic-error";

export interface IHoursRepository {
    findHoursById(hours_id:string):Promise < Either<DbGenericError , HoursData | null> >
}