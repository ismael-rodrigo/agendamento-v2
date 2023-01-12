import { CommomUserData } from "../../../../entities/common-user/commom-user-data"
import { CommomUser } from "../../../../entities/common-user/common-user"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"


export interface ICommonUserRepository {
    createUser(params:CommomUser) : Promise <Either < InvalidParamsError , CommomUserData >>
}