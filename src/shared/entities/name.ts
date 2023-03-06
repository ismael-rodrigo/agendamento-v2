
import { Either, Left, Right } from '../errors-handler/either'
import { InvalidNameError } from './errors/invalid-name-error'


export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if(Name.validate(name)) {
      const nameUpperCase = name.toUpperCase()
      return Right.create(new Name(nameUpperCase))
    }
    return Left.create(new InvalidNameError(name))
  }

  get value (): string {
    return this.name
  }

  static validate (name: string): boolean {
    if (
      !name || 
      name.trim().length < 2 || 
      name.trim().length > 70 || 
      !/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/.test(name)
      ) return false

    return true
  }
}