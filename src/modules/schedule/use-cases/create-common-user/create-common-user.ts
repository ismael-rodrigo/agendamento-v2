import { CommomUser } from "../../../../entities/common-user/common-user";
import { AppError } from "../../../../errors-handler/app-error";
import { Left, Right } from "../../../../errors-handler/either";
import { ICommonUserRepository } from "../../repositories/common-user/common-user-repository.interface";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

export class CreateCommonUser {
    constructor(private commonUserRepo:ICommonUserRepository){}
    async execute( {cpf ,date_birth , name , phone_number } : CreateCommonUserDTO.request ) {
        const userOrError = CommomUser.create({ cpf , date_birth , name , phone_number })
        if(userOrError.isLeft()){
            return Left.create(new AppError(userOrError.error.detail , userOrError.error.type ))
        }
        const user_created = await this.commonUserRepo.createUser( userOrError.value.valueObject() )
        return Right.create(user_created)
    }
}