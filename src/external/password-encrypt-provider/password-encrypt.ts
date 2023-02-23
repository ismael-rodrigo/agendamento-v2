import { InvalidPasswordProviderParams } from "@domain/_ports/providers/password-encrypt/errors/invalid-password-provider-params";
import { IPasswordEncryptProvider } from "@domain/_ports/providers/password-encrypt/password-encrypt.interface";
import bcrypt from "bcrypt"
import { Either, Left, Right } from "@shared/errors-handler/either";


export class PasswordEncryptProvider implements IPasswordEncryptProvider {
    private readonly saltOrRounds:number = 10;

    async generateHash(password:string) : Promise< Either< InvalidPasswordProviderParams ,string>> {
        if(!password) return Left.create(new InvalidPasswordProviderParams)
        const result = await bcrypt.hash(password , this.saltOrRounds)
        return Right.create(result)
    }

    async verifyHash(hash:string , password:string): Promise <Either< InvalidPasswordProviderParams ,boolean>> {
        if(!hash || !password) return Left.create(new InvalidPasswordProviderParams)
        const result = await bcrypt.compare(password , hash);
        return Right.create(result);
    }

}