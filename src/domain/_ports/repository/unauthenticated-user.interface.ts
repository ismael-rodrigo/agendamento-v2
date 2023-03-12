import { UnauthenticatedUserData } from './../../_entities/unauthenticated-user/unauthenticated-user-data';
import { Either } from "../../../shared/errors-handler/either"
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error"
import { InvalidParamsError } from "../../../shared/errors-handler/errors/invalid-params-error"
import { UpdateCommonUser } from "../../_entities/common-user/commom-user-data"
import { CommomUser } from "../../_entities/common-user/common-user"



export interface IUnauthenticatedUserRepository {
    findUserByCPF(cpf:string):Promise <Either <DbGenericError , UnauthenticatedUserData | null>>
    findUserById(user_id:string): Promise <Either <DbGenericError , UnauthenticatedUserData | null>>
    create(params:CommomUser) : Promise <Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData >>
    update(user_id:string , updates:UpdateCommonUser): Promise <Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData >>
    upsert(params:UnauthenticatedUserData): Promise <Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData >>
}