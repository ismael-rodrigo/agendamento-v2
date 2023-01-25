import { Either, Left, Right } from './../errors-handler/either';
import { invalidHourError } from './errors/invalid-hour-error';


export class Hour {
    private hour:number

    private constructor(value:number){
        this.hour = value
    }
    static create(value:number):Either<invalidHourError , Hour>{
        if(!this.validate(value)) return Left.create(new invalidHourError)
        return Right.create(new Hour(value))
    }
    static validate(value:number){
        if(!value) return false
        if(value<0) return false
        if(value>23) return false
        return true
    }
    get value(){
        return this.hour
    }
}