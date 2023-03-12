import { Either, Left, Right } from "@shared/errors-handler/either";
import { DbGenericError } from "@shared/errors-handler/errors/db-generic-error";
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error";
import { CommonUserData, UpdateCommonUser } from "@domain/_entities/common-user/commom-user-data";
import { CommomUser } from "@domain/_entities/common-user/common-user";
import { ICommonUserRepository } from "@domain/_ports/repository/common-user-repository.interface";


export class CommomUserInMemoryRepository implements ICommonUserRepository {
    public commmonUsers:CommonUserData[]
    constructor(){
        this.commmonUsers = []
    }
    update(user_id: string, updates: UpdateCommonUser): Promise<Either<DbGenericError | InvalidParamsError, CommonUserData>> {
        throw new Error("Method not implemented.");
    }
    findUserByCPF(cpf: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        throw new Error("Method not implemented.");
    }
    async createUser({cpf , name , phone_number , id ,email } : CommomUser): Promise<Either < InvalidParamsError, CommonUserData>> {
        if( !id.value || !cpf.value || !name.value || !phone_number.value ) return Left.create(new InvalidParamsError)
        const newCommonUser:CommonUserData = {
            email:email.value,
            id:id.value,
            cpf:cpf.value,
            name:name.value,
            phone_number:phone_number.value,
            password:'Ismael123',
            created_at:new Date(),
            updated_at:new Date()
        }
        this.commmonUsers.push(newCommonUser)
        return Right.create(newCommonUser)
    }


    async findUserById(user_id: string): Promise<Either<DbGenericError, CommonUserData | null>> {
        try{
            return Right.create(this.commmonUsers[0])

        }
        catch (err){
            return Left.create(new DbGenericError('findUser'))
        }
    }

}