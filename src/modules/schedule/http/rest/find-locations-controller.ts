import { FindLocations } from './../../domain/use-case/find-locations/find-locations';
import { HttpRequest } from './../../../_ports/controllers/http';
import { Controller } from './../../../_ports/controllers/controller';
import { badRequest, ok } from "../../../_ports/controllers/helper";


export class FindLocationsController implements Controller{
    constructor(private readonly findLocationsUseCase:FindLocations ){}

    async handle(httpRequest:HttpRequest){
        const result = await this.findLocationsUseCase.execute();
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
