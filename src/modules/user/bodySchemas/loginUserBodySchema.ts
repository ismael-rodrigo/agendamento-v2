import * as yup from "yup"

export const loginUserBodySchema:yup.AnyObjectSchema = yup.object().shape({
    username:yup
        .string()
        .required(),
    password:yup
        .string()
        .required()
}) 