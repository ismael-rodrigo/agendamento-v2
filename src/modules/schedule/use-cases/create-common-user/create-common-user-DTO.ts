import { CommomUserData, CreateCommomUser } from "../../../../entities/common-user/commom-user-data"
import { AppError } from "../../../../errors-handler/app-error"
import { Either } from "../../../../errors-handler/either"


export namespace CreateCommonUserDTO {
    export type request = CreateCommomUser

    export type response = Either< AppError , CommomUserData >
}