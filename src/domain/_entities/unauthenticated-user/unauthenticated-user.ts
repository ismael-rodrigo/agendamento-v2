import { Right } from '@shared/errors-handler/either';
import { CreateUnauthenticatedUser, UnauthenticatedUserData } from './unauthenticated-user-data';
import { Phone } from '@shared/entities/phone';
import { Cpf } from '@shared/entities/cpf';
import { Name } from '@shared/entities/name';
import { Uuid } from '@shared/entities/uuid/uuid';
import { Left } from '@shared/errors-handler/either';




export class UnauthenticatedUser {
    private constructor(
        public readonly id:Uuid ,
        public readonly cpf:Cpf ,
        public readonly name:Name ,
        public readonly phone_number:Phone
    ){

    }
    static create({cpf , name , phone_number , id}: CreateUnauthenticatedUser){
        const nameOrError = Name.create(name)
        const cpfOrError = Cpf.create(cpf)
        const phoneOrError = Phone.create(phone_number)
        const id_generated = Uuid.create(id)

        if (nameOrError.isLeft()) {
          return Left.create( nameOrError.error )
        }
        if (cpfOrError.isLeft()) {
          return Left.create( cpfOrError.error )
        }
        if (phoneOrError.isLeft()) {
          return Left.create( phoneOrError.error )
        }

        const _name = nameOrError.value
        const _cpf = cpfOrError.value
        const _phone_number = phoneOrError.value

        return Right.create(new UnauthenticatedUser(id_generated ,_cpf , _name , _phone_number))
    }

    get value():UnauthenticatedUserData{
        return {
            id:this.id.value,
            name:this.name.value,
            cpf:this.cpf.value ,
            phone_number: this.phone_number.value
        }
    }

}
