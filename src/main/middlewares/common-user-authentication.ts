import { IJwtProvider } from './../../domain/_ports/providers/jwt/jwt-provider.interface';
import { NextFunction, Request , Response } from "express";
import { AuthenticationError } from "../../shared/errors-handler/errors/authentication-error";
import { AuthenticatedRequest } from '@main/adapters/express-route-adapter';


export class CommonUserAuthenticationMiddleware {
    constructor(
        private readonly jwtProvider: IJwtProvider,
        ){}

    public handle = async ( req:AuthenticatedRequest , res:Response , next:NextFunction ) => {
        const authHeader = req.headers["authorization"]
        const user_id = req.params.user_id
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            const error = new AuthenticationError
            return res.status(error.statusCode).json(error.getJsonResponse())
        }
        const token = authHeader.substring(7, authHeader.length);
   
        const resultToken =  this.jwtProvider.verifyToken(token)
        if(resultToken.isLeft()){
            return res.status(resultToken.error.statusCode).json(resultToken.error.getJsonResponse())
        }
        req.consumer_id = resultToken.value.sub
        return next();
    }
}
