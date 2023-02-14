import { HttpRequest } from './../../../_ports/controllers/http';
import { Controller } from './../../../_ports/controllers/controller';
import { CreateSchedule } from "../../domain/use-case/setup-schedule/setup-schedule";
import { badRequest, ok } from '../../../_ports/controllers/helper';


export class CreateScheduleController implements Controller {
    constructor(private readonly createSchedule: CreateSchedule){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.createSchedule.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);

    }
}