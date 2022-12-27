import * as yup from 'yup'
import { RequestHandler } from "express";
import { AppError } from '../errors/appError';


export class MiddlewareBodyValidation {
    constructor(private bodyValidation:yup.AnyObjectSchema){}
    
    public handle:RequestHandler = async ( req , res , next ) => {
        try{
            await this.bodyValidation.validate( req.body , { abortEarly : true } )
            return next();
        }
        catch (err) {
            const yupError = err as yup.ValidationError;
            const errors: Record<string, string> = {};
        
            yupError.inner.forEach(error => {
              if (error.path === undefined) return;
              errors[error.path] = error.message;
            });
        
            throw new AppError(errors , "INVALID_ARGUMENST")
        }
       
    }
}