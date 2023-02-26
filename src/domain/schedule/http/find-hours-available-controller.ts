import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from "../../_ports/controllers/helper";
import { FindHoursByDateServiceAvailableUseCase } from '../use-case/find-hours-availabe/find-hours-availabe';


export class FindHoursAvailableController implements Controller{
    constructor(private readonly findHoursByDateServiceAvailableUseCase: FindHoursByDateServiceAvailableUseCase ){}

    async handle(httpRequest:HttpRequest){
        const query = httpRequest.query
        const result = await this.findHoursByDateServiceAvailableUseCase.execute({
            date_consulted:query.date,
            service_id:query.service_id
        });
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
