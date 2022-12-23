import { Router } from "express";
import { CreateUserController } from "../modules/user/usecases/createUser/createUserController";
import { FindAllUsersController } from "../modules/user/usecases/findUsers/findAllUsersController";


const createUserController = new CreateUserController()
const findAllUsersController = new FindAllUsersController()
const userRoutes = Router()

userRoutes.post('/' , createUserController.handle)
userRoutes.get('/'  , findAllUsersController.handle)

export {userRoutes}