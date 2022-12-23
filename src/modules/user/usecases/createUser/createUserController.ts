import { Request, Response } from "express";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserValidations } from "./createUserValidations";



export class CreateUserController {
    async handle(req:Request , res:Response){
        const params: CreateUserDTO.params = req.body;

        const userValidations = new CreateUserValidations(params);
        userValidations.is_valid();

        const createUserUseCase = new CreateUserUseCase();
        const result = await createUserUseCase.execute(params);

        return res.status(201).json(result);
    }
}