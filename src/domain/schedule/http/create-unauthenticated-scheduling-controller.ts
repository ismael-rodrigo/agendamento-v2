import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from "../../_ports/controllers/helper";
import { CreateUnauthenticatedSchedule } from '../use-case/unauthenticated-scheduling/unauthenticated-scheduling';


export class CreateUnauthenticatedScheduleController implements Controller{
    constructor(private readonly usecase: CreateUnauthenticatedSchedule ){}

    async handle(httpRequest:HttpRequest){
        const body = httpRequest.body
        const result = await this.usecase.execute(body);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}
