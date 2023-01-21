import { Request, Response } from "express";
import {container} from "tsyringe"
import { FindHoursByDateServiceAvailableUseCase } from "../../domain/use-case/find-hours-availabe/find-hours-availabe";


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