import { IJwtProvider } from "../../../../_ports/providers/jwt/jwt-provider.interface";
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { AuthenticationError } from "../../../../../shared/errors-handler/errors/authentication-error";
import { CredentialsInvalidError } from "../../../../../shared/errors-handler/errors/credentials-invalid-error";
import { IUserRepository } from "../../port/user-repository.interface";
import { CheckIfUserIsAdminResponse } from "./check-if-user-is-admin-data";


export class CheckUserIsAdminUseCase {
    constructor(
        private readonly userRepository:IUserRepository,
        private readonly jwtProvider:IJwtProvider
        ){}

    async execute(token:string) : Promise< CheckIfUserIsAdminResponse >{
        const resultToken = this.jwtProvider.verifyToken(token)
        
        if(!resultToken.sub) return Left.create(new CredentialsInvalidError)

        const userAlreadyExists = await this.userRepository.getUserById(resultToken.sub);
        
        if(!userAlreadyExists) return Left.create(new CredentialsInvalidError)
        
        if(!userAlreadyExists.is_admin) return Left.create(new AuthenticationError)
        
        return Right.create(userAlreadyExists);
        
    }
}