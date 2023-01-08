import { CommomUserData } from "../../../../entities/CommomUser/commom-user-data"


export interface ICommonUserRepository {
    createUser(params:CommomUserData) : Promise < CommomUserData | null>

}