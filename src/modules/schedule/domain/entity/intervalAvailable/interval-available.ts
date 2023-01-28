import { InvalidParamsError } from './../../../../../shared/errors-handler/errors/invalid-params-error';
import { Either, Left, Right } from './../../../../../shared/errors-handler/either';
import { CreateIntervalDateAvailable } from './interval-data';
import { Uuid } from './../../../../../shared/entities/uuid';

export class IntervalDateAvailable {
    public readonly id:Uuid
    public readonly intial_date:Date
    public readonly final_date:Date
    public readonly service_id:string

    private constructor( id:Uuid , intial_date:Date , final_date:Date , service_id:string ){
        this.id = id
        this.intial_date = intial_date
        this.final_date = final_date 
        this.service_id = service_id 
    }
    static create({ id , intial_date , final_date , service_id }:CreateIntervalDateAvailable): Either< InvalidParamsError , IntervalDateAvailable>{
        const _id = id ? Uuid.create(id) : Uuid.create()
        if(!service_id){
            return Left.create(new InvalidParamsError('Service not provided'))
        }
        if(new Date(intial_date) > new Date(final_date)){
            return Left.create(new InvalidParamsError('Final date is befored as initial date'))
        }
        return Right.create(new IntervalDateAvailable( _id , intial_date , final_date , service_id ) )
    }

    get value(){
        return {
            id:this.id.value,
            intial_date:this.intial_date,
            final_date:this.final_date,
            service_id:this.service_id
        }
    }

}