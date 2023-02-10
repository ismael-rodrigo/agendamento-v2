import { IntervalDateAvailableData } from './../../entity/intervalAvailable/interval-data';
import { DateDisabledData } from './../../entity/date-disabled/date-disabled-data';
import { Either } from '../../../../../shared/errors-handler/either';
import { DbGenericError } from './../../../../../shared/errors-handler/errors/db-generic-error';
import { DayDisabledData } from './../../entity/day-disabled/day-disabled-data';
import { DayDisabled } from '../../entity/day-disabled/day-disabled';
import { DateDisabled } from '../../entity/date-disabled/date-disabled';
import { IntervalDateAvailable } from '../../entity/intervalAvailable/interval-available';


export interface IConfigsSchedulesRepository {
    findIntervalAvailable( service_id:string ): Promise<Either< DbGenericError, IntervalDateAvailableData | null >>

    addDayDisabled( day:DayDisabled ) :Promise<Either<DbGenericError, DayDisabledData>>
    addDateDisabled( date: DateDisabled ):Promise<Either<DbGenericError, DateDisabledData>>

    findDayDisabled( day:number , service_id:string ):Promise<Either<DbGenericError, DayDisabledData | null >>
    findDateDisabled( date:Date , service_id:string ):Promise<Either<DbGenericError, DateDisabledData | null >>
}