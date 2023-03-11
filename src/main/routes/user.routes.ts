import { makeChangePasswordCommonUserController } from './../factories/make-change-password-common-user-controller';
import { MakeCheckCommonUserExists } from './../factories/make-check-common-user-exists-controller';
import { makeLoginCommonUserController } from './../factories/make-login-common-user-controller';
import { JwtCommonUserProvider } from './../../external/jwt-provider/jwt-common-user-provider';
import { CommonUserAuthenticationMiddleware } from '../middlewares/common-user-authentication';
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/make-create-user-controller";
import { makeRegisterCommonUserController } from '@main/factories/make-register-common-user-controller';
import { makeScheduleController } from '@main/factories/make-create-schedule-controller';
import { makeRecoveryCommonUserController } from '@main/factories/make-recovery-common-user-controller';


const commonUserAuth = new CommonUserAuthenticationMiddleware(new JwtCommonUserProvider())

const userRoutes = Router()

userRoutes.post('/' ,  
    adaptRoute( makeRegisterCommonUserController() ));

userRoutes.get('/',
    adaptRoute( MakeCheckCommonUserExists() ))

userRoutes.post('/recovery' ,  
    adaptRoute( makeRecoveryCommonUserController() ));

userRoutes.post('/login' ,  
    adaptRoute( makeLoginCommonUserController() ));

userRoutes.post('/schedule',
    commonUserAuth.handle,
    adaptRoute( makeScheduleController() ))

userRoutes.put('/password',
    commonUserAuth.handle,
    adaptRoute( makeChangePasswordCommonUserController() ))





export {userRoutes}