import { Left, Right } from "../../../../../shared/errors-handler/either";
import { AuthenticationError } from "../../../../../shared/errors-handler/errors/authentication-error";
import { CheckIfUserIsAdminResponse } from "./user-is-admin-data";
import { User } from "../../../../user/domain/entity/user";
import { UserData } from "../../../../user/domain/entity/user-data";


export class UserIsAdmin {
    static check(user:UserData) :CheckIfUserIsAdminResponse{
        if(user.is_admin){
            return Right.create(user)
        }
        return Left.create(new AuthenticationError);
    }
}