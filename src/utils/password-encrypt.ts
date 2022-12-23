import bcrypt from "bcrypt"


export class PasswordEncryptProvider {
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