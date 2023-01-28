import { Either, Right } from './../../../../../shared/errors-handler/either';
import { Uuid } from "../../../../../shared/entities/uuid"
import { Left } from "../../../../../shared/errors-handler/either"
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error"
import { CreateService } from "./service-data"

export class Service {
    public readonly id:Uuid
    public readonly service_name:string 
    public readonly location_id:string 
    
    
    private constructor(id:Uuid , service_name:string , location_id:string){
        this.id = id
        this.service_name = service_name
        this.location_id = location_id
    }

    static create({service_name  , id , location_id}:CreateService):Either<InvalidParamsError , Service>{
        const _id = id? Uuid.create(id) : Uuid.create()
        if(!service_name) return Left.create(new InvalidParamsError('Service name not provided' , 'SERVICE_NAME_NOT_PROVIDER'))
        if(!location_id) return Left.create(new InvalidParamsError('Location not provided' , 'LOCATION_NOT_PROVIDER'))
        return Right.create(new Service(_id , service_name , location_id))
    }

    get value(){
        return {
            id:this.id.value,
            location_id:this.location_id ,
            service_name:this.service_name
        }
    }

}