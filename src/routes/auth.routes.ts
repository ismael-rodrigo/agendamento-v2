import { Router } from "express";
import { BodyValidationMiddleware } from "../middlewares/middleware-body-validation";
import { loginUserBodySchema } from "../modules/user/bodySchemas/loginUserBodySchema";
import { LoginUserController } from "../modules/user/usecases/login-user/loginUserController";



const loginUserController = new LoginUserController()
const middlewareBodyValidation = new BodyValidationMiddleware(loginUserBodySchema)

const authRoutes = Router()

authRoutes.post('/login' , middlewareBodyValidation.handle, loginUserController.handle)

export {authRoutes}