import { DbGenericError } from './../../../../../shared/errors-handler/errors/db-generic-error';
import { Either } from './../../../../../shared/errors-handler/either';
import { LocationData } from './../../entity/location/location-data';
export interface ILocationsRepository {
    findMany():Promise< Either <DbGenericError ,LocationData[]>>
    //add():Promise< Either <DbGenericError ,LocationData>>
}