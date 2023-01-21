
import { AppError } from "../../../../../shared/errors-handler/app-error";
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { CommomUser } from "../../entity/common-user/common-user";
import { ICommonUserRepository } from "../../port/repository/common-user-repository.interface";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

export class CreateCommonUser {
    constructor(private commonUserRepo:ICommonUserRepository){}
    async execute( {cpf ,date_birth , name , phone_number } : CreateCommonUserDTO.request ): Promise <CreateCommonUserDTO.response> {
        const userOrError = CommomUser.create({ cpf , date_birth , name , phone_number })
        if(userOrError.isLeft()){
            return Left.create(new AppError(userOrError.error.detail , userOrError.error.type ))
        }
        const user_created = await this.commonUserRepo.createUser(userOrError.value)
        if(user_created.isLeft()){
            return Left.create(new AppError(user_created.error.detail , user_created.error.type ))
        }
        return Right.create(user_created.value)
    }
}
