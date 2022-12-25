import bcrypt from "bcrypt"
import {IPasswordEncryptProvider} from "./IPasswordEncrypt"

export class PasswordEncryptProvider implements IPasswordEncryptProvider {
    private readonly saltOrRounds:number = 10;

    async generateHash(password:string) : Promise<string> {
        const result = await bcrypt.hash(password , this.saltOrRounds)
        return result
    }

    async verifyHash(hash:string , password:string): Promise<boolean> {
        const result = await bcrypt.compare(password , hash);
        return result;
    }

}