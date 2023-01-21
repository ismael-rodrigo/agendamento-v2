import { AppError } from "../../../../../errors-handler/app-error"
import { Either } from "../../../../../errors-handler/either"
import { CommomUserData, CreateCommomUser } from "../../entity/common-user/commom-user-data"



export namespace CreateCommonUserDTO {
    export type request = CreateCommomUser

    export type response = Either< AppError , CommomUserData >
}