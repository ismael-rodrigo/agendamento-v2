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






export class CommomUser {
  public readonly id: Uuid
  public readonly name: Name
  public readonly cpf: Cpf
  public readonly phone_number: Phone
  public readonly date_birth : BirthDate

  private constructor (id: Uuid ,name: Name, cpf: Cpf , phone_number:Phone , date_birth : BirthDate) {
    this.id = id
    this.name = name
    this.cpf = cpf
    this.phone_number = phone_number
    this.date_birth = date_birth
    Object.freeze(this)
  }

  static create (userData: CreateCommomUser ): Either< InvalidNameError | InvalidCpfError | InvalidPhoneError | invalidBirthDateError , CommomUser > {
    const nameOrError = Name.create(userData.name)
    const cpfOrError = Cpf.create(userData.cpf)
    const phoneOrError = Phone.create(userData.phone_number)
    const birthDateOrError = BirthDate.create(userData.date_birth)
    const id_generated = Uuid.create()

    if (nameOrError.isLeft()) {
      return Left.create( new InvalidNameError(userData.name) )
    }
    if (cpfOrError.isLeft()) {
      return Left.create( new InvalidCpfError(userData.cpf) )
    }
    if (phoneOrError.isLeft()) {
      return Left.create( new InvalidPhoneError(userData.phone_number) )
    }
    if (birthDateOrError.isLeft()) {
      return Left.create( new invalidBirthDateError )
    }

    const name = nameOrError.value
    const email = cpfOrError.value
    const phone_number = phoneOrError.value
    const birth_date = birthDateOrError.value

    return Right.create(new CommomUser( id_generated, name, email , phone_number , birth_date ))
  }


  valueObject(){
    return {
      id: this.id.value ,
      name: this.name.value ,
      cpf: this.cpf.value ,
      phone_number:this.phone_number.value,
      date_birth : this.date_birth.value ,
    }
  }

}