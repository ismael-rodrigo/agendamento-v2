import * as yup from 'yup'
import { AppError } from '../errors-handler/app-error';
import { Left, Right } from '../errors-handler/either';
import { IObjectValidator } from './object-validator-yup.interface';



export class ObjectValidator implements IObjectValidator {
    async compare( bodyValidation:yup.AnyObjectSchema , object:object){
        try{
            await bodyValidation.validate(object)
            return Right.create(true)
        }
        catch (err) {
            const yupError = err as yup.ValidationError;
            return Left.create(new AppError(yupError.errors , "INVALID_PARAMS"))
        }

    }
}