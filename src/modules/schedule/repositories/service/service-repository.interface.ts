import { ServiceData } from "../../../../entities/service/service-data";
import { Either } from "../../../../errors-handler/either";
import { DbGenericError } from "../../../../errors-handler/errors/db-generic-error";

export interface IServiceRepository {
    findServiceById(service_id:string):Promise <Either<DbGenericError , ServiceData | null>>
}