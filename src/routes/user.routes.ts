import { Router } from "express";
import { BodyValidationMiddleware } from "../middlewares/middleware-body-validation";
import { AdminValidationMiddleware } from "../middlewares/middleware-is-admin-validation";
import { createUserBodySchema } from "../modules/user/bodySchemas/createUserBodySchema";
import { CreateUserController } from "../modules/user/usecases/create-user/createUserController";


const createUserController = new CreateUserController()
const middlewareBodyValidation = new BodyValidationMiddleware(createUserBodySchema)
const adminValidationMiddleware = new AdminValidationMiddleware();

const userRoutes = Router()

userRoutes.post('/' ,  
    middlewareBodyValidation.handle, 
    adminValidationMiddleware.handle,
    createUserController.handle );




export {userRoutes}