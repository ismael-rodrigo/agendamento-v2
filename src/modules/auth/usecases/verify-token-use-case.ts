import { injectable,inject } from "tsyringe";
import { IJwtProvider } from "../../../utils/jwt-provider/jwt-provider.interface";
import { VerifyTokenDTO } from "../dtos/verify-token-DTO";



@injectable()
export class VerifyTokenUseCase {

    constructor(
        @inject("JwtProvider") private jwtProvider:IJwtProvider
        ){}

    async execute({ token } : VerifyTokenDTO.params) : Promise<VerifyTokenDTO.returned>{
        this.jwtProvider.verifyToken(token)
    }
}