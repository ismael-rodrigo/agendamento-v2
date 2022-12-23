import { Request, Response } from "express";
import { LoginUserDTO } from "../../dtos/loginUserDTO";
import { LoginUserUseCase } from "./loginUserUseCase";

export class LoginUserController {
    async handle(req:Request , res:Response){
        const params: LoginUserDTO.params = req.body;
        const loginUserUseCase = new LoginUserUseCase()
        const result = await loginUserUseCase.execute(params)
        return res.status(200).json(result);
    }
}