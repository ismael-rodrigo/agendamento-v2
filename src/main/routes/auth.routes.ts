import { makeLoginUserController } from './../factories/make-login-user-controller';
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";


const authRoutes = Router()

authRoutes.post('/login' , adaptRoute( makeLoginUserController() ))
//authRoutes.post('/verify', verifyTokenBodyValidationMiddleware.handle , verifyTokenController.handle)



export {authRoutes}