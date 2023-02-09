import { InvalidWeekday } from './errors/invalid-weekday-error';
import { Either, Left, Right } from './../errors-handler/either';

export class Weekday {
    private value:number
    private constructor(value:number){
        this.value = value
    } 

    static create(weekday:number):Either<InvalidWeekday , Weekday>{
        if(this.validate(weekday)){
            return Right.create(new Weekday(weekday))
        }
        return Left.create(new InvalidWeekday)
    }

    static validate(weekday:number){
        if( weekday < 0 || weekday > 6 ){
            return false
        }
        return true
    }
}
