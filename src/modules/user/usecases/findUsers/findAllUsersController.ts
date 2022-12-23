import { Request, Response } from "express";
import { FindAllUsersUseCase } from "./findAllUsersUseCase";



export class FindAllUsersController {
    async handle(_:Request , res:Response){
        const createUserUseCase = new FindAllUsersUseCase();
        const result = await createUserUseCase.execute();
        return res.status(201).json(result);
    }
}