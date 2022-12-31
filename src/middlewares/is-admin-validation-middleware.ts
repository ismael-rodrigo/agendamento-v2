import { NextFunction, Request , Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../errors/appError";
import { CheckUserIsAdminUseCase } from "../modules/user/usecases/check-if-user-is-admin/check-if-user-is-admin-use-case";



export class AdminValidationMiddleware {
    constructor(){}
    public handle = async ( req:Request , res:Response , next:NextFunction ) => {
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