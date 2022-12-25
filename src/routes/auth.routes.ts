import { Router } from "express";
import { LoginUserController } from "../modules/auth/usecases/verifyToken/verifyTokenController";


const loginUserController = new LoginUserController()


const authRoutes = Router()

authRoutes.post('/login' , loginUserController.handle)

export {authRoutes}