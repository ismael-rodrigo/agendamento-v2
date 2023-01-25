import { Either, Right } from './../../../../../shared/errors-handler/either';
import { Uuid } from "../../../../../shared/entities/uuid"
import { Left } from "../../../../../shared/errors-handler/either"
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error"
import { CreateService } from "./service-data"

export class Service {
    public readonly id:Uuid
    public readonly service_name:string 
    
    private constructor(id:Uuid , service_name:string ){
        this.id = id
        this.service_name = service_name
    }

    static create({service_name  , id}:CreateService):Either<InvalidParamsError , Service>{
        const _id = id? Uuid.create(id) : Uuid.create()
        if(!service_name) return Left.create(new InvalidParamsError('Service name not provided' , 'SERVICE_NAME_NOT_PROVIDER'))
        
        return Right.create(new Service( _id , service_name ))
    }

}