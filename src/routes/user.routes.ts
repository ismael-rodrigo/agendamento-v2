import { Router } from "express";
import { MiddlewareBodyValidation } from "../middlewares/middlewareBodyValidation";
import { createUserBodySchema } from "../modules/user/bodySchemas/createUserBodySchema";
import { CreateUserController } from "../modules/user/usecases/createUser/createUserController";
import { FindAllUsersController } from "../modules/user/usecases/findUsers/findAllUsersController";

const createUserController = new CreateUserController()
const middlewareBodyValidation = new MiddlewareBodyValidation(createUserBodySchema)

const findAllUsersController = new FindAllUsersController()

const userRoutes = Router()

userRoutes.post('/' ,  middlewareBodyValidation.handle , createUserController.handle)
userRoutes.get( '/' , findAllUsersController.handle )

export {userRoutes}