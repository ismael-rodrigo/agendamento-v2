import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyTokenDTO } from "../../domain/usecases/dtos/verify-token-DTO";
import { VerifyTokenUseCase } from "../../domain/usecases/verify-token";



export class VerifyTokenController {
    async handle(req:Request , res:Response){
        const params: VerifyTokenDTO.params = req.body;
        
        const verifyToken = container.resolve(VerifyTokenUseCase)
        const result = await verifyToken.execute(params)
        return res.status(200).json(result);
    }
}