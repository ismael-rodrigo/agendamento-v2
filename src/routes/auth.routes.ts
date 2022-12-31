import { Router } from "express";
import { BodyValidationMiddleware } from "../middlewares/body-validation-middleware";
import { verifyTokenBodySchema } from "../modules/auth/body-schemas/verify-token-body-schema";
import { VerifyTokenController } from "../modules/auth/usecases/verify-token/verify-token-controller";
import { loginUserBodySchema } from "../modules/user/body-schemas/login-user-body-schema";
import { LoginUserController } from "../modules/user/usecases/login-user/login-user-controller";



const loginUserController = new LoginUserController()
const LoginbodyValidationMiddleware = new BodyValidationMiddleware(loginUserBodySchema)

const verifyTokenController = new VerifyTokenController()
const verifyTokenBodyValidationMiddleware = new BodyValidationMiddleware(verifyTokenBodySchema)


const authRoutes = Router()

authRoutes.post('/login' , LoginbodyValidationMiddleware.handle , loginUserController.handle)
authRoutes.post('/verify', verifyTokenBodyValidationMiddleware.handle , verifyTokenController.handle)



export {authRoutes}