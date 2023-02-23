import { FindUser } from "@domain/admin/use-case/find-user/find-user";
import { User } from "@domain/_entities/user/user";
import { NextFunction, Request , Response } from "express";
import { AuthenticationError } from "../../shared/errors-handler/errors/authentication-error";



export class AdminValidationMiddleware {
    constructor(private readonly findUserService:FindUser){}
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

        const userOrError = await this.findUserService.handle("id")
        if(userOrError.isLeft()){
            return res.status(userOrError.error.statusCode).json(userOrError.error.getJsonResponse())
        }
        const UserAdminOrError = User.isAdmin(userOrError.value)
        if(UserAdminOrError.isLeft()){
            return res.status(UserAdminOrError.error.statusCode).json(UserAdminOrError.error.getJsonResponse())
        }
        return next();
    }
}