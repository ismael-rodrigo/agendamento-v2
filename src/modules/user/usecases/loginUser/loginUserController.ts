import { Request, Response } from "express";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt-provider/PasswordEncrypt";
import { LoginUserDTO } from "../../dtos/loginUserDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { LoginUserUseCase } from "./loginUserUseCase";

export class LoginUserController {
    async handle(req:Request , res:Response){
        const params: LoginUserDTO.params = req.body;

        const userRepository = new UserRepository()
        const passwordEncryptProvider = new PasswordEncryptProvider()
    
        const loginUserUseCase = new LoginUserUseCase(userRepository , passwordEncryptProvider)
        const result = await loginUserUseCase.execute(params)
        
        return res.status(200).json(result);
    }
}