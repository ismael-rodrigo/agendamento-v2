import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/make-create-user-controller";




const userRoutes = Router()

userRoutes.post('/' ,  
    //adminValidationMiddleware.handle,
    adaptRoute( makeCreateUserController() ) );



export {userRoutes}