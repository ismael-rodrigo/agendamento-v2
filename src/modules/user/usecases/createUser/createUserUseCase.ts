import { AppError } from "../../../../errors/appError";
import { db } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/createUserDTO";



export class CreateUserUseCase {
    async execute ({name , password} : CreateUserDTO.params) : Promise<CreateUserDTO.returned> {

    const userAlreadyExists = await db.user.findFirst({
        where:{
            name
        }
    })

    if(userAlreadyExists){
        throw new AppError("User already exists!" , "USER_ALREADY_EXISTS");
    }


    const { id } = await db.user.create({
        data:{
            name,
            password
        }
    })

    return {
        id,
        name
    } as CreateUserDTO.returned
    }

}