import { RequestHandler } from "express";
import { container } from "tsyringe";
import { AppError } from "../errors/appError";
import { LoginUserDTO } from "../modules/user/dtos/loginUserDTO";
import { CheckUserIsAdminUseCase } from "../modules/user/usecases/check-if-user-is-admin/check-if-user-is-admin-use-case";

export class AdminValidationMiddleware {
    constructor(){}
    public handle:RequestHandler = async ( req , _ , next ) => {
        const authHeader = req.headers["authorization"]
        let token;
        
        if (authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7, authHeader.length);
        }
        else{
            throw new AppError("Token invalid" , "TOKEN_INVALID");
        }

        const checkUserAdmin =  container.resolve(CheckUserIsAdminUseCase);
        await checkUserAdmin.execute(token);
        return next();
    }
}