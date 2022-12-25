import { Router } from "express";
import { LoginUserController } from "../modules/user/usecases/loginUser/loginUserController";



const loginUserController = new LoginUserController()


const authRoutes = Router()

authRoutes.post('/login' , loginUserController.handle)

export {authRoutes}