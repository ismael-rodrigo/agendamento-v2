import { AppError } from '../../../shared/errors-handler/errors/app-error';
import { Minutes } from '../../../shared/entities/minute';
import { Hour } from '../../../shared/entities/hour';
import { Either, Left, Right } from '../../../shared/errors-handler/either';
import { Uuid } from '../../../shared/entities/uuid/uuid';
import { CreateHourAvailable, HourAvailableData } from './hours-data';




export class HourAvailable {

    
    private constructor(
        private id:Uuid,
        private hour:Hour, 
        private minutes:Minutes,
        private service_id:string,
        private enable:boolean 
        ){
    }


    static create({ hour , minutes , service_id , id  , enable}:CreateHourAvailable):Either< AppError , HourAvailable>{
        const _id = id ? Uuid.create(id) : Uuid.create()
        const hourOrError = Hour.create(hour)
        if(hourOrError.isLeft()) return Left.create(new AppError(hourOrError.error.detail ,hourOrError.error.type )) 

        const minuteOrError = Minutes.create(minutes)
        if(minuteOrError.isLeft()) return Left.create(new AppError(minuteOrError.error.detail ,minuteOrError.error.type ))

        const isEnable = enable == undefined ? false : enable

        return Right.create( new HourAvailable(  _id , hourOrError.value , minuteOrError.value , service_id , isEnable ))
    }

    get value(){
        return {
            id:this.id.value,
            hour:this.hour.value,
            minutes:this.minutes.value,
            service_id:this.service_id,
            enable:this.enable
        } as HourAvailableData
    }

}
