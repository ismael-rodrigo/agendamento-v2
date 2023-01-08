import { CommomUserData } from "../../../../entities/CommomUser/commom-user-data"
import { AppError } from "../../../../errors-handler/app-error"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"





export namespace CreateCommonUserDTO {
    export type request = CommomUserData

    export type response = Either< AppError , CommomUserData >
}