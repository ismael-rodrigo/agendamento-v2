import { CommomUserData, CreateCommomUser } from "@domain/_entities/common-user/commom-user-data"
import { Either } from "@shared/errors-handler/either"
import { AppError } from "@shared/errors-handler/errors/app-error"





export namespace CreateCommonUserDTO {
    export type request = CreateCommomUser

    export type response = Either< AppError , CommomUserData >
}