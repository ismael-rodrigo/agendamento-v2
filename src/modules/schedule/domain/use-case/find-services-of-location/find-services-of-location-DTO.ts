import { ServiceData } from './../../entity/service/service-data';
import { AppError } from '../../../../../shared/errors-handler/errors/app-error';
import { Either } from './../../../../../shared/errors-handler/either';
export interface FindServicesOfLocationRequest {
    location_id:string
}

export type FindServicesOfLocationResponse = Either<AppError , ServiceData[]>
