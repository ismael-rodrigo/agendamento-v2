import { Request, Response } from "express";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/PasswordEncrypt";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserValidations } from "./createUserValidations";



export class CreateUserController {
    async handle(req:Request , res:Response){
        const params: CreateUserDTO.params = req.body;

        const userValidations = new CreateUserValidations(params);
        userValidations.is_valid();

        const userRepository = new UserRepository()
        const passwordEncryptProvider = new PasswordEncryptProvider()

        const createUserUseCase = new CreateUserUseCase(userRepository , passwordEncryptProvider);

        const result = await createUserUseCase.execute(params);

        return res.status(201).json(result);
    }
}