import { Either, Left, Right } from './../errors-handler/either';
import { invalidMinutesError } from './errors/invalid-minute-error';


export class Minutes {
    private minutes:number

    private constructor(value:number){
        this.minutes = value
    }
    static create(value:number):Either<invalidMinutesError , Minutes>{
        if(!this.validate(value)) return Left.create(new invalidMinutesError)
        return Right.create(new Minutes(value))
    }
    static validate(value:number){
        if(!value) return false
        if(value<0) return false
        if(value>59) return false
        return true
    }
    get value(){
        return this.minutes
    }
}