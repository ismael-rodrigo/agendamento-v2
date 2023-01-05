import { Request, Response } from "express";
import { VerifyHoursAvailableDTO } from "../dtos/find-hours-available-DTO";
import { FindHoursByDateServiceAvailableUseCase } from "../use-cases/find-hours-availabe-use-case";
import {container} from "tsyringe"


export class FindHoursAvailableController {
    async handle(req:Request , res:Response){

        const params: VerifyHoursAvailableDTO.params = req.body
        const FindHoursAvailable = container.resolve(FindHoursByDateServiceAvailableUseCase);
        const result = await FindHoursAvailable.execute(params);

        return res.status(200).json(result);
    }
}