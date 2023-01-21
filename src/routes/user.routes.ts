import { Router } from "express";
import { AdminValidationMiddleware } from "../middlewares/is-admin-validation-middleware";
import { CreateUserController } from "../modules/user/http/rest/create-user-controller";


const createUserController = new CreateUserController()
const adminValidationMiddleware = new AdminValidationMiddleware();

const userRoutes = Router()

userRoutes.post('/' ,  
    //adminValidationMiddleware.handle,
    createUserController.handle );



export {userRoutes}