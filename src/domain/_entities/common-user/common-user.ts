import { CommonUserData, CommonUserResponse } from '@domain/_entities/common-user/commom-user-data';
import { Email } from '../../../shared/entities/email';
import { BirthDate } from "../../../shared/entities/birth-date"
import { Cpf } from "../../../shared/entities/cpf"
import { Name } from "../../../shared/entities/name"
import { Phone } from "../../../shared/entities/phone"
import { Uuid } from "../../../shared/entities/uuid/uuid"

import { CreateCommonUser } from "./commom-user-data"
import { Either, Left, Right } from "../../../shared/errors-handler/either"
import { InvalidNameError } from "../../../shared/entities/errors/invalid-name-error"
import { InvalidCpfError } from "../../../shared/entities/errors/invalid-cpf-error"
import { InvalidPhoneError } from "../../../shared/entities/errors/invalid-phone-error"
import { invalidBirthDateError } from "../../../shared/entities/errors/invalid-date-birth-date"
import { Password } from '../../../shared/entities/password/password';
import { IPasswordEncryptProvider } from '../../_ports/providers/password-encrypt/password-encrypt.interface';


export class CommomUser {
  public readonly id: Uuid
  public readonly name: Name
  public readonly email: Email
  public readonly cpf: Cpf
  public readonly phone_number: Phone
  public readonly password: Password

  private constructor (id: Uuid ,name: Name,password:Password , email:Email ,cpf: Cpf , phone_number:Phone ) {
    this.id = id
    this.name = name
    this.cpf = cpf
    this.phone_number = phone_number
    this.email = email
    this.password = password
    Object.freeze(this)
  }

  static async create ( passwordHasher:IPasswordEncryptProvider , userData: CreateCommonUser ): Promise<Either<InvalidNameError | InvalidCpfError | InvalidPhoneError | invalidBirthDateError, CommomUser>> {
    const nameOrError = Name.create(userData.name)
    const cpfOrError = Cpf.create(userData.cpf)
    const phoneOrError = Phone.create(userData.phone_number)
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


    const name = nameOrError.value
    const cpf = cpfOrError.value
    const phone_number = phoneOrError.value
    const email = emailOrError.value
    const password = passwordOrError.value

    return Right.create(new CommomUser( id_generated, name , password , email, cpf , phone_number  ))
  }


  get value():CommonUserData{
    return {
      email:this.email.value,
      password:this.password.value,
      id: this.id.value ,
      name: this.name.value ,
      cpf: this.cpf.value ,
      phone_number:this.phone_number.value,
    }
  }

  static responseValue(user:CommonUserData):CommonUserResponse{
    return {
      email:user.email,
      id: user.id ,
      name: user.name ,
      cpf: user.cpf ,
      phone_number:user.phone_number,
    }
  }

}