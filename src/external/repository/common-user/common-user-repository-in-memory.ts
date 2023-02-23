import { Either, Left, Right } from "@shared/errors-handler/either";
import { DbGenericError } from "@shared/errors-handler/errors/db-generic-error";
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error";
import { CommomUserData } from "@domain/_entities/common-user/commom-user-data";
import { CommomUser } from "@domain/_entities/common-user/common-user";
import { ICommonUserRepository } from "@domain/_ports/repository/common-user-repository.interface";


export class CommomUserInMemoryRepository implements ICommonUserRepository {
    public commmonUsers:CommomUserData[]
    constructor(){
        this.commmonUsers = []
    }
    findUserByCPF(cpf: string): Promise<Either<DbGenericError, CommomUserData | null>> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<Either<DbGenericError, CommomUserData | null>> {
        throw new Error("Method not implemented.");
    }
    async createUser({cpf , date_birth , name , phone_number , id ,email } : CommomUser): Promise<Either < InvalidParamsError, CommomUserData>> {
        if( !id.value || !cpf.value || !date_birth.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)
        const newCommonUser:CommomUserData = {
            email:email.value,
            id:id.value,
            cpf:cpf.value,
            name:name.value,
            phone_number:phone_number.value,
            date_birth:date_birth.value,
            created_at:new Date(),
            updated_at:new Date()
        }
        this.commmonUsers.push(newCommonUser)
        return Right.create(newCommonUser)
    }


    async findUserById(user_id: string): Promise<Either<DbGenericError, CommomUserData | null>> {
        try{
            return Right.create(this.commmonUsers[0])

        }
        catch (err){
            return Left.create(new DbGenericError('findUser'))
        }
    }

}