export interface IPasswordEncryptProvider {
    generateHash(password:string) : Promise <string>
    verifyHash(hash:string , password:string): Promise <boolean>
}