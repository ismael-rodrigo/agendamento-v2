import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user-DTO";
import { CreateUserUseCase } from "../usecases/create-user-use-case";
import {container, inject, injectable} from "tsyringe"

@injectable()
export class CreateUserController {

    async handle( req:Request < {} , {} , CreateUserDTO.params > , res:Response){

        const params = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase)
        const result = await createUserUseCase.execute(params);

        return res.status(201).json(result);
    }
}