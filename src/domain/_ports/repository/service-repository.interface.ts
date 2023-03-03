import { FindServicesRequest } from './../../admin/use-case/find-services/find-services-DTO';
import { Either } from "../../../shared/errors-handler/either";
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error";
import { ServiceData , CreateService} from "../../_entities/service/service-data";

export interface IServiceRepository {
    findServiceById(service_id:string):Promise <Either<DbGenericError , ServiceData | null>>
    add(data:CreateService):Promise <Either< DbGenericError , ServiceData>>
    findServicesByLocationId(location_id:string):Promise <Either<DbGenericError , ServiceData[]>>
    query(params:FindServicesRequest):Promise <Either<DbGenericError , ServiceData[]>>
}