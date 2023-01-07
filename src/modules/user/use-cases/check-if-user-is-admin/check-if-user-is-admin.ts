import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors-handler/app-error"; 
import { CredentialsInvalidError } from "../../../../errors-handler/errors/credentials-invalid-error";
import { Left, Right } from "../../../../errors-handler/either";
import { IJwtProvider } from "../../../../utils/jwt-provider/jwt-provider.interface";
import { IUserRepository } from "../../repositories/user-repository.interface";
import { CheckIfUserIsAdminResponse } from "./check-if-user-is-admin-response";
import { AuthenticationError } from "../../../../errors-handler/errors/authentication-error";

@injectable()
export class CheckUserIsAdminUseCase {
    constructor(
        @inject("UserRepository") private userRepository:IUserRepository,
        @inject("JwtProvider") private jwtProvider:IJwtProvider
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