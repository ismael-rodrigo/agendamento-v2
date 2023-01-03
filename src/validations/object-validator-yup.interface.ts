import * as yup from 'yup'

export interface IObjectValidator {
    compare( bodyValidation:yup.AnyObjectSchema , object:object): Promise<void>
}