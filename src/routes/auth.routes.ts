import { Router } from "express";
import { BodyValidationMiddleware } from "../middlewares/body-validation-middleware";
import { verifyTokenBodySchema } from "../modules/auth/body-schemas/verify-token-body-schema";
import { VerifyTokenController } from "../modules/auth/controllers/verify-token-controller";
import { loginUserArgsSchema } from "../modules/user/use-cases-args-schemas/login-user-args-schema";
import { LoginUserController } from "../modules/user/controllers/login-user-controller";



const loginUserController = new LoginUserController()
const LoginbodyValidationMiddleware = new BodyValidationMiddleware(loginUserArgsSchema)

const verifyTokenController = new VerifyTokenController()
const verifyTokenBodyValidationMiddleware = new BodyValidationMiddleware(verifyTokenBodySchema)


const authRoutes = Router()

authRoutes.post('/login' , LoginbodyValidationMiddleware.handle , loginUserController.handle)
authRoutes.post('/verify', verifyTokenBodyValidationMiddleware.handle , verifyTokenController.handle)



export {authRoutes}