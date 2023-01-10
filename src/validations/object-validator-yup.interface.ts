import * as yup from 'yup'
import { AppError } from '../errors-handler/app-error'
import { Either } from '../errors-handler/either'

export interface IObjectValidator {
    compare( bodyValidation:yup.AnyObjectSchema , object:object): Promise<Either<AppError , boolean>>
}