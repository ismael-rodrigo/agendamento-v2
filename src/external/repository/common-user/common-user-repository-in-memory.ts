import { Either, Left, Right } from "../../../shared/errors-handler/either";
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error";
import { InvalidParamsError } from "../../../shared/errors-handler/errors/invalid-params-error";
import { CommomUserData } from "../../../modules/schedule/domain/entity/common-user/commom-user-data";
import { CommomUser } from "../../../modules/schedule/domain/entity/common-user/common-user";
import { ICommonUserRepository } from "../../../modules/schedule/domain/port/repository/common-user-repository.interface";


export class CommomUserInMemoryRepository implements ICommonUserRepository {
    public commmonUsers:CommomUserData[]
    constructor(){
        this.commmonUsers = []
    }
    async createUser({cpf , date_birth , name , phone_number , id  } : CommomUser): Promise<Either < InvalidParamsError, CommomUserData>> {
        if( !id.value || !cpf.value || !date_birth.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)
        const newCommonUser:CommomUserData = {
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