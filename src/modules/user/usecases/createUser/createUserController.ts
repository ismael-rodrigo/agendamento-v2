import { Request, Response } from "express";
import { JwtProvider } from "../../../../utils/jwt-provider/jwtProvider";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/PasswordEncrypt";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "./createUserUseCase";



export class CreateUserController {
    async handle( req:Request < {} , {} , CreateUserDTO.params > , res:Response ){
        const params = req.body;

        const userRepository = new UserRepository()
        const passwordEncryptProvider = new PasswordEncryptProvider()

        const createUserUseCase = new CreateUserUseCase(userRepository , passwordEncryptProvider);

        const result = await createUserUseCase.execute(params);

        return res.status(201).json(result);
    }
}