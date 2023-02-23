import { Either } from "../../../../shared/errors-handler/either"
import { InvalidParamsError } from "../../../../shared/errors-handler/errors/invalid-params-error"



export type CreateUserResponseData = { id:string, username:string}
export type CreateUserRequest = { username:string , password:string }
export type CreateUserResponse = Either < InvalidParamsError , CreateUserResponseData >