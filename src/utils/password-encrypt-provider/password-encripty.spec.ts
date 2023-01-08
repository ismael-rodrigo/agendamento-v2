import { describe, expect, it } from "vitest";
import { InvalidPasswordProviderParams } from "./errors/invalid-password-provider-params";
import { PasswordEncryptProvider } from "./password-encrypt";




describe('create password provider', ()=>{
    const sut = new PasswordEncryptProvider()
    const password = 'password-tested'

    it('verify instace of password provider' , ()=>{
        expect(sut).instanceOf(PasswordEncryptProvider)  
    })

    it('a password should not be generated if not provided' , ()=>{
        const access_token = sut.generateHash("")
        access_token.then((data)=>{
            expect(data.isLeft()).toEqual(true)
            //if(!data.isLeft())return
            //expect(data.error).toBeInstanceOf(InvalidPasswordProviderParams)
        })
    })

    it('a password should generated if provided' , ()=>{
        const access_token = sut.generateHash(password)
        access_token.then((data)=>{
            expect(data.isLeft()).toEqual(true)
            //if(!data.isLeft())return
            //expect(data.error).toBeInstanceOf(InvalidPasswordProviderParams)
        })
    })


})