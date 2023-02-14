import { FindServicesOfLocation } from './../../domain/use-case/find-services-of-location/find-services-of-location';
import { HttpRequest } from './../../../_ports/controllers/http';
import { Controller } from './../../../_ports/controllers/controller';
import { badRequest, ok } from "../../../_ports/controllers/helper";
import { FindHoursByDateServiceAvailableUseCase } from '../../domain/use-case/find-hours-availabe/find-hours-availabe';


export class FindServicesOfLocationController implements Controller{
    constructor(private readonly findServicesOfLocation: FindServicesOfLocation ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.findServicesOfLocation.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
