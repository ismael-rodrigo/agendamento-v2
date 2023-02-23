
import { CommomUser } from "@domain/_entities/common-user/common-user";
import { IPasswordEncryptProvider } from "@domain/_ports/providers/password-encrypt/password-encrypt.interface";
import { ICommonUserRepository } from "@domain/_ports/repository/common-user-repository.interface";
import { Left, Right } from "@shared/errors-handler/either";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

export class CreateCommonUser {
    constructor(
        private commonUserRepo:ICommonUserRepository,
        private passwordHasher:IPasswordEncryptProvider
        
        ){}
    async execute( { cpf ,date_birth , name , phone_number , email , password } : CreateCommonUserDTO.request ): Promise <CreateCommonUserDTO.response> {
        
        const userOrError = await CommomUser.create(this.passwordHasher , { cpf , date_birth , name , phone_number , email , password })
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
