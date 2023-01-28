import { InvalidParamsError } from './../../../../../shared/errors-handler/errors/invalid-params-error';
import { Either, Left, Right } from './../../../../../shared/errors-handler/either';
import { CreateLocationData } from './location-data';
import { Uuid } from './../../../../../shared/entities/uuid';

export class Location {
    public readonly id:Uuid
    public readonly address:string
    
    private constructor(id:Uuid , address:string){
        this.id = id
        this.address = address
    }
    static create({id , address }:CreateLocationData):Either<InvalidParamsError , Location>{
        const _id = id? Uuid.create(id) : Uuid.create()
        if(!address){
            return Left.create(new InvalidParamsError('Invalid address provided'))
        }
        return Right.create(new Location(_id , address))
    }

    get value(){
        return{
            id:this.id.value,
            address:this.address,
        }
    }

}