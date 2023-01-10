import { Request, Response } from "express";
import { FindHoursByDateServiceAvailableUseCase } from "../use-cases/find-hours-availabe/find-hours-availabe";
import {container} from "tsyringe"


export class FindHoursAvailableController {
    async handle(req:Request , res:Response){
        const params = req.body
        const FindHoursAvailable = container.resolve(FindHoursByDateServiceAvailableUseCase);
        const result = await FindHoursAvailable.execute(params);

        if(result.isLeft()){
            return res.status(result.error.statusCode).json(result.error.getJsonResponse())
        }
        return res.status(200).json(result.value);
    }
}

