import { Router } from "express";
import { BodyValidationMiddleware } from "../middlewares/body-validation-middleware";
import { AdminValidationMiddleware } from "../middlewares/is-admin-validation-middleware";
import { createUserBodySchema } from "../modules/user/body-schemas/create-user-body-schema";
import { CreateUserController } from "../modules/user/usecases/create-user/create-user-controller";


const createUserController = new CreateUserController()
const middlewareBodyValidation = new BodyValidationMiddleware(createUserBodySchema)
const adminValidationMiddleware = new AdminValidationMiddleware();

const userRoutes = Router()

userRoutes.post('/' ,  
    middlewareBodyValidation.handle, 
    //adminValidationMiddleware.handle,
    createUserController.handle );





export {userRoutes}