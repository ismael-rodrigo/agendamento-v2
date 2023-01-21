import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user-DTO";

import { container } from "tsyringe"
import { CreateUserUseCase } from "../../domain/use-case/create-user/create-user";


export class CreateUserController {

    async handle( req:Request < {} , {} , CreateUserDTO.params > , res:Response){

        const params = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase)
        const result = await createUserUseCase.execute(params);

        if(result.isLeft()){
            return res.status(result.error.statusCode).json(result.error.getJsonResponse())
        }
        
        return res.status(201).json(result);
    }
}