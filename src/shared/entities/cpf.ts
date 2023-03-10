import { cpf } from 'cpf-cnpj-validator'; 
import { Either, Left, Right } from '../errors-handler/either';
import { InvalidCpfError } from './errors/invalid-cpf-error';


export class Cpf {
  private readonly cpf: string
  private constructor (cpf: string) {
    this.cpf = cpf
    Object.freeze(this)
  }

  static create (name: string): Either< InvalidCpfError , Cpf > {
    if (!Cpf.validate(name)) {
      return Left.create(new InvalidCpfError(name))
    }
    return Right.create(new Cpf(name))
  }

  get value (): string {
    return this.cpf
  }

  static validate (_cpf: string): boolean {
    if (!_cpf) return false
    if(!cpf.isValid(_cpf)) return false
    return true
  }
}