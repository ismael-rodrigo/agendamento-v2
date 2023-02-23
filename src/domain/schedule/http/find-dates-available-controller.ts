import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from "../../_ports/controllers/helper";
import { FindDatesAvailableUseCase } from '../use-case/find-dates-availables/find-dates-availables';


export class FindDatesAvailableController implements Controller {
    constructor(private readonly findDatesAvailable: FindDatesAvailableUseCase ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.findDatesAvailable.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
