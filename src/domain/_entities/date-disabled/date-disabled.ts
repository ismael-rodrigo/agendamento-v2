import { InvalidParamsError } from '../../../shared/errors-handler/errors/invalid-params-error';
import { Either, Left, Right } from '../../../shared/errors-handler/either';
import { Uuid } from '../../../shared/entities/uuid';
import { CreateDateDisabled } from './date-disabled-data';


export class DateDisabled {
    public readonly id: Uuid
    public readonly date: Date
    public readonly service_id: string


    private constructor( id: Uuid , date: Date , service_id: string){
        this.id = id 
        this.date = date 
        this.service_id = service_id 
    }

    static create( { id , date , service_id } : CreateDateDisabled ): Either < InvalidParamsError , DateDisabled> {
        const _id = id ? Uuid.create(id) : Uuid.create()
        if(!date) return Left.create(new InvalidParamsError('Date not provided'))
        if(!service_id) return Left.create(new InvalidParamsError('Service ID not provided'))
        return Right.create(new DateDisabled( _id , date , service_id ))
    }

    get value(){
        return {
            id:this.id.value,
            date:this.date,
            service_id:this.service_id
        }
    }
}