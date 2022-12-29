import { Request, Response } from "express";
import { VerifyTokenDTO } from "../../dtos/verifyTokenDTO";
import { VerifyTokenUseCase } from "./verifyTokenUseCase";



export class VerifyTokenController {
    async handle(req:Request , res:Response){
        const params: VerifyTokenDTO.params = req.body;
        const verifyToken = new VerifyTokenUseCase()
        const result = await verifyToken.execute(params)
        return res.status(200).json(result);
    }
}