import { makeLoginCommonUserController } from './../factories/make-login-common-user-controller';
import { JwtCommonUserProvider } from './../../external/jwt-provider/jwt-common-user-provider';
import { CommonUserAuthenticationMiddleware } from '../middlewares/common-user-authentication';
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/make-create-user-controller";
import { makeRegisterCommonUserController } from '@main/factories/make-register-common-user-controller';
import { makeScheduleController } from '@main/factories/make-create-schedule-controller';


const commonUserAuth = new CommonUserAuthenticationMiddleware(new JwtCommonUserProvider())

const userRoutes = Router()

userRoutes.post('/' ,  
    adaptRoute( makeRegisterCommonUserController() ));

userRoutes.post('/login' ,  
    adaptRoute( makeLoginCommonUserController() ));

userRoutes.post('/:user_id/schedule',
    commonUserAuth.handle,
    adaptRoute( makeScheduleController() ))


export {userRoutes}