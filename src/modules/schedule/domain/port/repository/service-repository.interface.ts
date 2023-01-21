import { Either } from "../../../../../shared/errors-handler/either";
import { DbGenericError } from "../../../../../shared/errors-handler/errors/db-generic-error";
import { ServiceData } from "../../entity/service/service-data";

export interface IServiceRepository {
    findServiceById(service_id:string):Promise <Either<DbGenericError , ServiceData | null>>
}