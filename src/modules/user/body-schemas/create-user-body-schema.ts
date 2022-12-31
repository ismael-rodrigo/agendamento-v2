import * as yup from "yup"
import YupPassword from 'yup-password'
YupPassword(yup)

export const createUserBodySchema:yup.AnyObjectSchema = yup.object().shape({
    username:yup
        .string()
        .required()
        .min(2)
        .max(85),
    password:yup
        .string()
        .required()
        .password()
        .min( 8, 'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character')
}) 