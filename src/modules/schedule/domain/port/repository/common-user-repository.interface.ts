import { Either } from "../../../../../shared/errors-handler/either"
import { DbGenericError } from "../../../../../shared/errors-handler/errors/db-generic-error"
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error"
import { CommomUserData } from "../../entity/common-user/commom-user-data"
import { CommomUser } from "../../entity/common-user/common-user"



export interface ICommonUserRepository {
    findUserById(user_id:string): Promise <Either <DbGenericError , CommomUserData | null>>
    createUser(params:CommomUser) : Promise <Either<DbGenericError | InvalidParamsError, CommomUserData >>
}