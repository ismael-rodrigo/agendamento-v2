import { Router } from "express";
import { MiddlewareBodyValidation } from "../middlewares/middlewareBodyValidation";
import { createUserBodySchema } from "../modules/user/bodySchemas/createUserBodySchema";
import { CreateUserController } from "../modules/user/usecases/createUser/createUserController";


const createUserController = new CreateUserController()
const middlewareBodyValidation = new MiddlewareBodyValidation(createUserBodySchema)

const userRoutes = Router()

userRoutes.post('/' ,  middlewareBodyValidation.handle , createUserController.handle)


export {userRoutes}