import { Either, Left, Right } from "../../errors-handler/either"
import { Uuid } from "../../utils/uuid-generator/uuid"
import { BirthDate } from "./birth-date"
import { CommomUserData } from "./commom-user-data"
import { Cpf } from "./cpf"
import { InvalidCpfError } from "./errors/invalid-cpf-error"
import { invalidBirthDateError } from "./errors/invalid-date-birth-date"
import { InvalidNameError } from "./errors/invalid-name-error"
import { InvalidPhoneError } from "./errors/invalid-phone-error"
import { Name } from "./name"
import { Phone } from "./phone"





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

  static create (userData: CommomUserData ): Either< InvalidNameError | InvalidCpfError | InvalidPhoneError | invalidBirthDateError , CommomUser > {
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