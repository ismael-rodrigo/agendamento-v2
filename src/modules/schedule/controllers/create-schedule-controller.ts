import { Request, Response } from "express";
import { VerifyHoursAvailableDTO } from "../use-cases/find-hours-availabe/find-hours-available-DTO";
import { FindHoursByDateServiceAvailableUseCase } from "../use-cases/find-hours-availabe/find-hours-availabe";
import {container} from "tsyringe"
import { CreateSchedule } from "../use-cases/create-schedule/create-schedule";


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