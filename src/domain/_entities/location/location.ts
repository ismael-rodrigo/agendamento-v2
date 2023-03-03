import { LocationData } from '@domain/_entities/location/location-data';
import { InvalidParamsError } from '../../../shared/errors-handler/errors/invalid-params-error';
import { Either, Left, Right } from '../../../shared/errors-handler/either';
import { CreateLocationData } from './location-data';
import { Uuid } from '../../../shared/entities/uuid/uuid';

export class Location {
    public readonly id:Uuid
    public readonly address:string
    public readonly name:string    
    private constructor(id:Uuid , address:string , name:string){
        this.id = id
        this.address = address
        this.name = name
    }
    static create({id , address , name }:CreateLocationData):Either<InvalidParamsError , Location>{
        const _id = id? Uuid.create(id) : Uuid.create()
        if(!address){
            return Left.create(new InvalidParamsError('Invalid address provided'))
        }
        if(!name){
            return Left.create(new InvalidParamsError('Invalid name provided'))
        }
        return Right.create(new Location(_id , address , name))
    }

    get value():LocationData{
        return {
            id:this.id.value,
            address:this.address,
            name:this.name
        }
    }

}