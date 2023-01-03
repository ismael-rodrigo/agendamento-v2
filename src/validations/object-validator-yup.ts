import * as yup from 'yup'
import { AppError } from '../errors/appError';
import { IObjectValidator } from './object-validator-yup.interface';



export class ObjectValidator implements IObjectValidator {
    async compare( bodyValidation:yup.AnyObjectSchema , object:object){
        try{
            await bodyValidation.validate(object)
        }
        catch (err) {
            const yupError = err as yup.ValidationError;
            throw new AppError(yupError.errors , "INVALID_ARGUMENST")
        }

    }
}