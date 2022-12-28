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
            throw new AppError(yupError.errors , "INVALID_ARGUMENST")
        }
       
    }
}