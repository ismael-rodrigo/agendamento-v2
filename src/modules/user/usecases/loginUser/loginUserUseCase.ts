import { AppError } from "../../../../errors/appError";
import { db } from "../../../../prisma-client/client";
import { PasswordEncryptProvider } from "../../../../utils/password-encrypt";
import { LoginUserDTO } from "../../dtos/loginUserDTO";

export class LoginUserUseCase {
    async execute({name , password} : LoginUserDTO.params) : Promise<LoginUserDTO.returned>{

        const passwordEncryptProvider = new PasswordEncryptProvider()
        const user = await db.user.findFirst({
            where:{
                name
            }
        })
        if(!user){
            throw new AppError("User not exists!","USER_NOT_EXISTS");
        }

        const password_valid = passwordEncryptProvider.verifyHash(user.password , password)

        
        return{
            token:{
                access:"access",
                refresh:"refresh"
            }
        }
    }
}