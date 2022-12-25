import { LoginUserDTO } from "../../../user/dtos/loginUserDTO";
import { VerifyTokenDTO } from "../../dtos/verifyTokenDTO";

export class VerifyTokenUseCase {
    async execute({token , type} : VerifyTokenDTO.params) : Promise<VerifyTokenDTO.returned>{
        return{
            new_token:{
                token,
                type
            }
        }
    }
}