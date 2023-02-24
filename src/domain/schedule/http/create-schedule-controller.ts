import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';
import { CreateSchedule } from '../use-case/setup-schedule/setup-schedule';


export class CreateScheduleController implements Controller {
    constructor(private readonly createSchedule: CreateSchedule){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const user_id = httpRequest.params.user_id
        const result = await this.createSchedule.execute({
            service_id: params.service_id,
            date: params.date,
            hour_id: params.hour_id,
            user_id: user_id
        });
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);

    }
}