import { NextFunction, Request , Response } from "express";
import { container } from "tsyringe";
import { CheckUserIsAdminUseCase } from "../../modules/user/domain/use-case/check-if-user-is-admin/check-if-user-is-admin";
import { AuthenticationError } from "../../shared/errors-handler/errors/authentication-error";




export class AdminValidationMiddleware {
    constructor(){}
    public handle = async ( req:Request , res:Response , next:NextFunction ) => {
        const authHeader = req.headers["authorization"]
        let token;
        
        if (authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7, authHeader.length);
        }
        else{
            const error = new AuthenticationError
            return res.status(error.statusCode).json(error.getJsonResponse())
        }

        const checkUserAdmin =  container.resolve(CheckUserIsAdminUseCase);

        const result = await checkUserAdmin.execute(token);
        if(result.isLeft()){
            return res.status(result.error.statusCode).json(result.error.getJsonResponse())
        }
        return next();
    }
}