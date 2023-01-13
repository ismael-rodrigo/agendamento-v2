import { CommomUserData } from "../../../../entities/common-user/commom-user-data"
import { CommomUser } from "../../../../entities/common-user/common-user"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"
import { DbGenericError } from "../errors/PrismaError"


export interface ICommonUserRepository {
    findUser(user_id:string): Promise <Either<DbGenericError , CommomUserData | null>>
    createUser(params:CommomUser) : Promise <Either<DbGenericError | InvalidParamsError, CommomUserData >>
}