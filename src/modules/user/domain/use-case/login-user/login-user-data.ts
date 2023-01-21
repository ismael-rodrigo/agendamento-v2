import { Either } from "../../../../../shared/errors-handler/either";
import { CredentialsInvalidError } from "../../../../../shared/errors-handler/errors/credentials-invalid-error";


export type LoginUserRequest = {username:string , password:string}

export type LoginUserResponse = Either< CredentialsInvalidError , {access:string , refresh:string} >