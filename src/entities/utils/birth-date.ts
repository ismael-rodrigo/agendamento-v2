import { Either, Left, Right } from "../../errors-handler/either"
import { invalidBirthDateError } from "./errors/invalid-date-birth-date"
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidPhoneError } from "./errors/invalid-phone-error"

export class BirthDate {
  private readonly birth_date: Date

  private constructor (birth_date: Date) {
    this.birth_date = birth_date
    Object.freeze(this)
  }

  static create (birth_date: Date): Either< invalidBirthDateError, BirthDate> {
    if (!BirthDate.validate(birth_date)) {
      return Left.create(new invalidBirthDateError )
    }
    return Right.create(new BirthDate(birth_date))
  }

  get value (): Date {
    return this.birth_date
  }

  static validate (birth_date : Date): boolean {
    if(!birth_date) return false
    if(!birth_date.valueOf()) return false
    if( new Date().getFullYear() - birth_date.getFullYear() <= 0 ) return false
    if( new Date().getFullYear() - birth_date.getFullYear() > 120 ) return false

    return true
  }
}