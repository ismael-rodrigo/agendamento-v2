import { Right } from './../../errors-handler/either';
import { beforeEach, expect, vi } from 'vitest';
import { PasswordEncryptProvider } from '@external/password-encrypt-provider/password-encrypt';
import { Password } from './password';
import {describe, it} from 'vitest'
import {mock, MockProxy  } from 'vitest-mock-extended'
import { InvalidPasswordError } from '../errors/invalid-password-error';

// Password must not be null or white spaces
// Password must have character
// - Uppercase
// - Lowcase
// - Number


describe('Password entity unitary test',()=>{

    let passwordHasherMocked:MockProxy<PasswordEncryptProvider>

    beforeEach(() => {
        passwordHasherMocked = mock<PasswordEncryptProvider>()
        
      });


    it('should be created password with valid param' , async ()=>{
        const password = 'Ismael@senha123'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )

        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(false)
        if(passwordOrError.isLeft()) return
        expect(passwordOrError.value.value).toBeTruthy()
        expect(passwordOrError.value.value == 'password-hashed-123').toEqual(true)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(1)

    })
    it('should not be created password with null param' , async ()=>{
        const password = ''
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })

    it('should not be created password with param lenght smaller to 8 caracters' , async ()=>{
        const password = 'Is@1234'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    it('should not be created password with param lenght bigger to 15 caracters' , async ()=>{
        const password = 'Ismael@senha1234'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    it('should not be created password with param not cotains uppercase caracter' , async ()=>{
        const password = 'ismael@senha123'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    it('should not be created password with param not cotains lowercase caracter' , async ()=>{
        const password = 'ISMAEL@SENHA123'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    it('should not be created password with param not cotains number caracter' , async ()=>{
        const password = 'ismael@senha'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    it('should not be created password with param cotains white spaces caracter' , async ()=>{
        const password = 'ismael senha'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )
        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(true)
        if(!passwordOrError.isLeft()) return
        expect(passwordOrError.error).toBeInstanceOf(InvalidPasswordError)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(0)
    })
    
})