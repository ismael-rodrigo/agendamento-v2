import { Either } from "../../../../shared/errors-handler/either"
import { InvalidPasswordProviderParams } from "./errors/invalid-password-provider-params"

export interface IPasswordEncryptProvider {
    generateHash(password:string) : Promise< Either< InvalidPasswordProviderParams ,string>>
    verifyHash(hash:string , password:string): Promise<Either< InvalidPasswordProviderParams ,boolean>>
}