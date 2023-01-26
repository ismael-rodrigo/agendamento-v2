
import { Either, Left, Right } from '../errors-handler/either'
import { InvalidUserNameError } from './errors/invalid-username-error'


export class Username {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (name: string): Either<InvalidUserNameError, Username> {
    if (!Username.validate(name)) {
      return Left.create(new InvalidUserNameError(name))
    }
    return Right.create(new Username(name))
  }

  get value (): string {
    return this.name
  }

  static validate (name: string): boolean {
    const regexValidation = /^[a-zA-Z0-9_\.]+$/
    if(!regexValidation.test(name)) return false
    if (!name || name.trim().length < 6 || name.trim().length > 15) {
      return false
    }
    return true
  }
}