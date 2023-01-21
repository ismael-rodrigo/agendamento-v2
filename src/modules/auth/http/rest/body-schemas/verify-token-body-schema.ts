import * as yup from "yup"

export const verifyTokenBodySchema:yup.AnyObjectSchema = yup.object().shape({
    token:yup
        .string()
        .required(),
}) 