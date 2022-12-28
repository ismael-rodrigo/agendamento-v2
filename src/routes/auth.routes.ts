import { Router } from "express";
import { MiddlewareBodyValidation } from "../middlewares/middlewareBodyValidation";
import { loginUserBodySchema } from "../modules/user/bodySchemas/loginUserBodySchema";
import { LoginUserController } from "../modules/user/usecases/loginUser/loginUserController";



const loginUserController = new LoginUserController()
const middlewareBodyValidation = new MiddlewareBodyValidation(loginUserBodySchema)

const authRoutes = Router()

authRoutes.post('/login' , middlewareBodyValidation.handle, loginUserController.handle)

export {authRoutes}