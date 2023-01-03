import * as yup from "yup"

export const loginUserArgsSchema:yup.AnyObjectSchema = yup.object().shape({
    username:yup
        .string()
        .required(),
    password:yup
        .string()
        .required()
}) 