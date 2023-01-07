import { Either, Left, Right } from "../../errors-handler/either"
import { InvalidNameError } from './errors/invalid-name-error'

export class Cpf {
  private readonly cpf: string

  private constructor (cpf: string) {
    this.cpf = cpf
    Object.freeze(this)
  }

  static create (name: string): Either< InvalidNameError, Cpf> {
    if (!Cpf.validate(name)) {
      return Left.create(new InvalidNameError(name))
    }
    return Right.create(new Cpf(name))
  }

  get value (): string {
    return this.cpf
  }

  static validate (cpf: string): boolean {
    var teste = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    
    if (!cpf) return false

    if(!teste.test(cpf)) return false

    return true
  }
}