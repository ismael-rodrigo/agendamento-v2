import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user-DTO";
import { CreateUserUseCase } from "../use-cases/create-user/create-user";
import { container } from "tsyringe"


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