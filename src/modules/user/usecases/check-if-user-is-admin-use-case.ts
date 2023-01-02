import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/appError"; 
import { IJwtProvider } from "../../../utils/jwt-provider/jwt-provider.interface";
import { IUserRepository } from "../repositories/user-repository.interface";

@injectable()
export class CheckUserIsAdminUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("JwtProvider") private jwtProvider:IJwtProvider
        ){}


    async execute(token:string) : Promise< User >{
        const resultToken = this.jwtProvider.verifyToken(token)
        
        if(!resultToken.sub) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");

        const userAlreadyExists = await this.userRepository.getUserById(resultToken.sub);
        
        if(!userAlreadyExists) throw new AppError("Credentials invalid!","CREDENTIAS_INVALID");
        
        if(!userAlreadyExists.is_admin) throw new AppError("You do not have permission!","NOT_PERMISSION");

        return userAlreadyExists;
        
    }
}