import { CommomUserData } from "../../../../entities/common-user/commom-user-data"


export interface ICommonUserRepository {
    createUser(params:CommomUserData) : Promise < CommomUserData | null>

}