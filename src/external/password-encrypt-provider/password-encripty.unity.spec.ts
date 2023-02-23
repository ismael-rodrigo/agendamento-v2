import { describe, expect, it, beforeEach } from "vitest";
import { InvalidPasswordProviderParams } from "@domain/_ports/providers/password-encrypt/errors/invalid-password-provider-params";
import { PasswordEncryptProvider } from "./password-encrypt";




describe('password provider', ()=>{
    const password = 'password-tested'

    describe('Create instace of PasswordEncripty' , ()=>{
        it('verify instace of password provider' , ()=>{
            const sut = new PasswordEncryptProvider()
            expect(sut).instanceOf(PasswordEncryptProvider)  
        })

    })

    describe('Create hash with passord' , ()=>{
        let sut:PasswordEncryptProvider;

        beforeEach(()=>{
            sut = new PasswordEncryptProvider()
        })

        it('a password should not be generated if not provided' , async ()=>{
            const password_encripty = await sut.generateHash("")
            expect(password_encripty.isLeft()).toEqual(true)
            if(!password_encripty.isLeft()) return
            expect(password_encripty.error).toBeInstanceOf(InvalidPasswordProviderParams)
        })

        it('a password should generated if provided' , async ()=>{
            const password_encripty = await sut.generateHash(password)
            expect(password_encripty.isLeft()).toEqual(false)
            if(password_encripty.isLeft()) return
            expect(password_encripty.value).toBeTruthy()
            expect(password_encripty.value).toString()
        })
    })

    describe('Hash decryption', async ()=>{
        let sut: PasswordEncryptProvider
        let password_of_hash = 'password-used-in-test' ;
        let hash_generated:string;



        beforeEach( async ()=>{
            sut = new PasswordEncryptProvider()
            const result = await sut.generateHash(password_of_hash)
            if(result.isLeft()) return
            hash_generated = result.value
        })

        it('must return true if the user enters the same password that was used to create the hash', async ()=>{
            const isPasswordValidOrError = await sut.verifyHash(hash_generated , password_of_hash)
            expect(isPasswordValidOrError.isLeft()).toEqual(false)
            if(isPasswordValidOrError.isLeft()) return
            expect(isPasswordValidOrError.value).toEqual(true)
        })

        it('must return false if the user enters the different password that was used to create the hash', async ()=>{
            const isPasswordValidOrError = await sut.verifyHash(hash_generated , 'password-not-used-by-hashing')
            expect(isPasswordValidOrError.isLeft()).toEqual(false)
            if(isPasswordValidOrError.isLeft()) return
            expect(isPasswordValidOrError.value).toEqual(false)
        })

        it('must return either error if the password not provided', async ()=>{
            const isPasswordValidOrError = await sut.verifyHash(hash_generated , '')
            expect(isPasswordValidOrError.isLeft()).toEqual(true)
            if(!isPasswordValidOrError.isLeft()) return
            expect(isPasswordValidOrError.error).toBeInstanceOf(InvalidPasswordProviderParams)
        })

        it('must return either error if the hash not provided', async ()=>{
            const isPasswordValidOrError = await sut.verifyHash('' , password_of_hash)
            expect(isPasswordValidOrError.isLeft()).toEqual(true)
            if(!isPasswordValidOrError.isLeft()) return
            expect(isPasswordValidOrError.error).toBeInstanceOf(InvalidPasswordProviderParams)
        })

    })
})