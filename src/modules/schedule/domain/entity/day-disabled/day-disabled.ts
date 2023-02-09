import { InvalidParamsError } from './../../../../../shared/errors-handler/errors/invalid-params-error';
import { Left, Either, Right } from './../../../../../shared/errors-handler/either';
import { Weekday } from './../../../../../shared/entities/weekday';
import { Uuid } from './../../../../../shared/entities/uuid';
import { CreateDayDisabled } from './day-disabled-data';
import { InvalidWeekday } from '../../../../../shared/entities/errors/invalid-weekday-error';



export class DayDisabled {
    public readonly id:Uuid
    public readonly weekday:Weekday
    
    private constructor(id:Uuid , weekday:Weekday){
        this.id = id 
        this.weekday = weekday 
    }
    
    static create( { id , day , service_id } : CreateDayDisabled ):Either < InvalidWeekday , DayDisabled>{
        const _id = id ? Uuid.create(id) : Uuid.create()
        const dayOrError = Weekday.create(day)
        if(dayOrError.isLeft()){
            return Left.create(dayOrError.error)
        }
        if(!service_id){
            return Left.create(new InvalidParamsError('Service ID not provided'))
        }

        return Right.create(new DayDisabled( _id , dayOrError.value ))
    }   
}