import { Either, Left, Right } from '../../errors-handler/either'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidPhoneError } from "./errors/invalid-phone-error"

export class Phone {
  private readonly phone: string

  private constructor (phone: string) {
    this.phone = phone
    Object.freeze(this)
  }

  static create (phone: string): Either< InvalidPhoneError, Phone> {
    if (!Phone.validate(phone)) {
      return Left.create(new InvalidNameError(phone))
    }
    return Right.create(new Phone(phone))
  }

  get value (): string {
    return this.phone
  }

  static validate (phone: string): boolean {
    var tester = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    if(!phone) return false
    if(!tester.test(phone)) return false
    return true
  }
}