import { Request, Response } from "express";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { CreateUserUseCase } from "./createUserUseCase";
import {container} from "tsyringe"


export class CreateUserController {
    async handle( req:Request < {} , {} , CreateUserDTO.params > , res:Response ){

        const params = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase)
        const result = await createUserUseCase.execute(params);

        return res.status(201).json(result);
    }
}