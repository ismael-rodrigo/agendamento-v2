import { IPasswordEncryptProvider } from '@domain/_ports/providers/password-encrypt/password-encrypt.interface';
import { Either, Left, Right } from '../../errors-handler/either';
import { InvalidPasswordError } from '../errors/invalid-password-error';
export class Password {
    public readonly value:string

    private constructor(password_hashed:string){
        this.value = password_hashed
    }
    static create(password:string):Either<InvalidPasswordError , Password>{
        if(!Password.validate(password)){
            return Left.create(new InvalidPasswordError)
        }
        return Right.create(new Password(password))
    }
    static async createHashed( passwordHasher:IPasswordEncryptProvider , password:string):Promise <Either<InvalidPasswordError , Password>>{
        if(!Password.validate(password)){
            return Left.create(new InvalidPasswordError)
        }
        const passwordHashed = await passwordHasher.generateHash(password)
        if(passwordHashed.isLeft()){
            return Left.create(new InvalidPasswordError)
        }
        return Right.create(new Password(passwordHashed.value))
    }

    static validate(password:string):boolean{
        const regexValidation = /^[a-zA-Z0-9!@*#$%&()_\.]+$/
        if(!regexValidation.test(password)) return false
        if (!password || password.trim().length < 8 || password.trim().length > 15) {
          return false
        }
        if(!password) return false
        return true
    }
}