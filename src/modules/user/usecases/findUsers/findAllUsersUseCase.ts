import { db } from "../../../../prisma-client/client";
import { UserGenericDTO } from "../../dtos/userGenericDTO";


export class FindAllUsersUseCase {
    async execute () : Promise<Array<UserGenericDTO>> {
    const users = await db.user.findMany({
        select:{
            id:true,
            name:true,
            password:true
        }
    });
    return users
    }
}
