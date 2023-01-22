import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors-handler/errors/app-error";

class ErrorHandler {
    async handle(err:Error , req:Request , res:Response , next:NextFunction  ){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                status:"error",
                type:err.type,
                detail:err.detail,
                date:err.date
            })
        }
        return res.status(500).json({
            status:"error",
            message:`Internal server error - ${err.message}`
        })
    }
}


export const errorHandler = new ErrorHandler();