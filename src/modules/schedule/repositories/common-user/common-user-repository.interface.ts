import { CommomUserData } from "../../../../entities/common-user/commom-user-data"
import { CommomUser } from "../../../../entities/common-user/common-user"
import { AppError } from "../../../../errors-handler/app-error"
import { Either } from "../../../../errors-handler/either"


export interface ICommonUserRepository {
    createUser(params:CommomUser) : Promise <Either < AppError , CommomUserData >>
}