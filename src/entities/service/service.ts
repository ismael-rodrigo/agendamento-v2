import { Left } from "../../errors-handler/either"
import { InvalidParamsError } from "../../errors-handler/errors/invalid-params-error"
import { Uuid } from "../../utils/uuid-generator/uuid"
import { CreateService } from "./service-data"

export class Service {
    public readonly id:Uuid
    public readonly service_name:string 
    
    private constructor({service_name}:CreateService){
        this.id = Uuid.create()
        this.service_name = service_name
    }

    static create({service_name}:CreateService){

        if(!service_name) return Left.create(new InvalidParamsError('Service name not provided' , 'SERVICE_NAME_NOT_PROVIDER'))
        
        return new Service({service_name})
    }

}