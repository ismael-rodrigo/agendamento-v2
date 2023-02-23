import { AppError } from '../../../shared/errors-handler/errors/app-error';
import { Minutes } from '../../../shared/entities/minute';
import { Hour } from '../../../shared/entities/hour';
import { Either, Left, Right } from '../../../shared/errors-handler/either';
import { Uuid } from '../../../shared/entities/uuid';
import { CreateHourAvailable, HourAvailableData } from './hours-data';




export class HourAvailable {
    public readonly id: Uuid
    public readonly hour:Hour
    public readonly minutes: Minutes 
    public readonly service_id: string
    
    private constructor( id:Uuid , hour:Hour , minutes:Minutes , service_id:string ){
        this.id = id
        this.hour = hour
        this.minutes = minutes
        this.service_id = service_id
    }

    static create({ hour , minutes , service_id , id }:CreateHourAvailable):Either< AppError , HourAvailable>{
        const _id = id ? Uuid.create(id) : Uuid.create()
        const hourOrError = Hour.create(hour)
        if(hourOrError.isLeft()) return Left.create(new AppError(hourOrError.error.detail ,hourOrError.error.type )) 

        const minuteOrError = Minutes.create(minutes)
        if(minuteOrError.isLeft()) return Left.create(new AppError(minuteOrError.error.detail ,minuteOrError.error.type )) 

        return Right.create( new HourAvailable(  _id , hourOrError.value , minuteOrError.value , service_id  ))
    }

    get value(){
        return {
            id:this.id.value,
            hour:this.hour.value,
            minutes:this.minutes.value,
            service_id:this.service_id
        } as HourAvailableData
    }

}
