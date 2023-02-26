import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from "../../_ports/controllers/helper";
import { FindServicesOfLocation } from '../use-case/find-services-of-location/find-services-of-location';


export class FindServicesOfLocationController implements Controller{
    constructor(private readonly findServicesOfLocation: FindServicesOfLocation ){}

    async handle(httpRequest:HttpRequest){
        const query = httpRequest.query
        const result = await this.findServicesOfLocation.execute({
            location_id:query.location_id
        });
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
