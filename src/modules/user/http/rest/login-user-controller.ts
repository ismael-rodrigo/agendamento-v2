import { Request, Response } from "express";
import { LoginUserDTO } from "./dtos/login-user-DTO";
import { LoginUserUseCase } from "../../domain/use-case/login-user/login-user";
import {container} from "tsyringe"


export class LoginUserController {
    async handle(req:Request , res:Response){

        const params: LoginUserDTO.params = req.body
        const loginUserUseCase = container.resolve(LoginUserUseCase);
        const result = await loginUserUseCase.execute(params);

        if(result.isLeft()){
            return res.status(result.error.statusCode).json(result.error.detail)
        }

        return res.status(200).json(result);
    }
}