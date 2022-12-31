import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyTokenDTO } from "../../dtos/verify-token-DTO";
import { VerifyTokenUseCase } from "./verify-token-use-case";



export class VerifyTokenController {
    async handle(req:Request , res:Response){
        const params: VerifyTokenDTO.params = req.body;
        
        const verifyToken = container.resolve(VerifyTokenUseCase)
        const result = await verifyToken.execute(params)
        return res.status(200).json(result);
    }
}