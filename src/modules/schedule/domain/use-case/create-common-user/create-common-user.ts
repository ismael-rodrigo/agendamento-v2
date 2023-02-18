
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { CommomUser } from "../../entity/common-user/common-user";
import { ICommonUserRepository } from "../../port/repository/common-user-repository.interface";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

export class CreateCommonUser {
    constructor(private commonUserRepo:ICommonUserRepository){}
    async execute( {cpf ,date_birth , name , phone_number , email} : CreateCommonUserDTO.request ): Promise <CreateCommonUserDTO.response> {
        
        
        const userOrError = CommomUser.create({ cpf , date_birth , name , phone_number ,email})
        if(userOrError.isLeft()){
            return Left.create(userOrError.error)
        }
        const user_created = await this.commonUserRepo.createUser(userOrError.value)
        if(user_created.isLeft()){
            return Left.create(user_created.error)
        }
        return Right.create(user_created.value)
    }
}
