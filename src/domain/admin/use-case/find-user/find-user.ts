import { InvalidParamsError } from '../../../../shared/errors-handler/errors/invalid-params-error';
import { Left, Right } from '../../../../shared/errors-handler/either';
import { IUserRepository } from '../../../_ports/repository/user-repository.interface';

export class FindUser {
    constructor(private readonly userRepository:IUserRepository){}

    async handle( id:string ){
        const userOrError = await this.userRepository.getUserById(id)
        
        if(userOrError.isLeft()){
            return Left.create(userOrError.error)
        }

        if(!userOrError.value){
            return Left.create(new InvalidParamsError)
        }

        return Right.create(userOrError.value)
    }
}