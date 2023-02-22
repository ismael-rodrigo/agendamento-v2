import { Email } from './../../../../../shared/entities/email';
import { BirthDate } from "../../../../../shared/entities/birth-date"
import { Cpf } from "../../../../../shared/entities/cpf"
import { Name } from "../../../../../shared/entities/name"
import { Phone } from "../../../../../shared/entities/phone"
import { Uuid } from "../../../../../shared/entities/uuid"

import { CreateCommomUser } from "./commom-user-data"
import { Either, Left, Right } from "../../../../../shared/errors-handler/either"
import { InvalidNameError } from "../../../../../shared/entities/errors/invalid-name-error"
import { InvalidCpfError } from "../../../../../shared/entities/errors/invalid-cpf-error"
import { InvalidPhoneError } from "../../../../../shared/entities/errors/invalid-phone-error"
import { invalidBirthDateError } from "../../../../../shared/entities/errors/invalid-date-birth-date"
import { Password } from '../../../../../shared/entities/password';
import { IPasswordEncryptProvider } from '../../../../_ports/providers/password-encrypt/password-encrypt.interface';


export class CommomUser {
  public readonly id: Uuid
  public readonly name: Name
  public readonly email: Email
  public readonly cpf: Cpf
  public readonly phone_number: Phone
  public readonly date_birth : BirthDate
  public readonly password: Password

  private constructor (id: Uuid ,name: Name,password:Password , email:Email ,cpf: Cpf , phone_number:Phone , date_birth : BirthDate) {
    this.id = id
    this.name = name
    this.cpf = cpf
    this.phone_number = phone_number
    this.date_birth = date_birth
    this.email = email
    this.password = password
    Object.freeze(this)
  }

  static async create ( passwordHasher:IPasswordEncryptProvider , userData: CreateCommomUser ): Promise<Either<InvalidNameError | InvalidCpfError | InvalidPhoneError | invalidBirthDateError, CommomUser>> {
    const nameOrError = Name.create(userData.name)
    const cpfOrError = Cpf.create(userData.cpf)
    const phoneOrError = Phone.create(userData.phone_number)
    const birthDateOrError = BirthDate.create(userData.date_birth)
    const emailOrError = Email.create(userData.email)
    const id_generated = Uuid.create()
    const passwordOrError = await Password.createHashed(passwordHasher , userData.password )

    if(passwordOrError.isLeft()){
      return Left.create( passwordOrError.error )
    }

    if(emailOrError.isLeft()){
      return Left.create( emailOrError.error )
    }

    if (nameOrError.isLeft()) {
      return Left.create( nameOrError.error )
    }
    if (cpfOrError.isLeft()) {
      return Left.create( cpfOrError.error )
    }
    if (phoneOrError.isLeft()) {
      return Left.create( phoneOrError.error )
    }
    if (birthDateOrError.isLeft()) {
      return Left.create( birthDateOrError.error )
    }

    const name = nameOrError.value
    const cpf = cpfOrError.value
    const phone_number = phoneOrError.value
    const birth_date = birthDateOrError.value
    const email = emailOrError.value
    const password = passwordOrError.value

    return Right.create(new CommomUser( id_generated, name , password , email, cpf , phone_number , birth_date ))
  }


  get value(){
    return {
      id: this.id.value ,
      name: this.name.value ,
      cpf: this.cpf.value ,
      phone_number:this.phone_number.value,
      date_birth : this.date_birth.value ,
    }
  }

}