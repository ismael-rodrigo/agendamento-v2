import { Request, Response } from "express";
import {container} from "tsyringe"
import { CreateSchedule } from "../../domain/use-case/create-schedule/create-schedule";


export class CreateScheduleController {
    async handle(req:Request , res:Response){

        const params = req.body
        const createSchedule = container.resolve(CreateSchedule);
        const result = await createSchedule.execute(params);

        if(result.isLeft()){
            return res.status(result.error.statusCode).json(result.error.getJsonResponse())
        }
        return res.status(200).json(result.value);
        
    }
}