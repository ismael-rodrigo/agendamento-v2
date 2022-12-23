import { LoginUserDTO } from "../../dtos/loginUserDTO";

export class LoginUserUseCase {
    async execute({name , password} : LoginUserDTO.params) : Promise<LoginUserDTO.returned>{
        return{
            token:{
                access:"access",
                refresh:"refresh"
            }
        }
    }
}