import { Right } from './../../errors-handler/either';
import { created } from './../../../domain/_ports/controllers/helper';
import { IPasswordEncryptProvider } from './../../../domain/_ports/providers/password-encrypt/password-encrypt.interface';
import { beforeEach, expect, vi } from 'vitest';
import { PasswordEncryptProvider } from '@external/password-encrypt-provider/password-encrypt';
import { Password } from './password';
import {describe, it} from 'vitest'
import {mock , mockFn, MockProxy , mockReset } from 'vitest-mock-extended'

// Password must not be null
// Password must have character
// - Uppercase
// - Lowcase
// - Number
// Method


describe('Password entity unitary test',()=>{

    let passwordHasherMocked:MockProxy<PasswordEncryptProvider>


    beforeEach(() => {
        passwordHasherMocked = mock<PasswordEncryptProvider>()
        
      });


    it('should be created password hashed with valid params' , async ()=>{
        const password = 'Ismael@senha123'
        passwordHasherMocked.generateHash.calledWith(password).mockReturnValue( Promise.resolve(Right.create('password-hashed-123')) )

        const passwordOrError = await Password.createHashed(passwordHasherMocked , password)
        expect(passwordOrError.isLeft()).toEqual(false)
        if(passwordOrError.isLeft()) return
        expect(passwordOrError.value.value).toBeTruthy()
        expect(passwordOrError.value.value == 'password-hashed-123').toEqual(true)
        expect(passwordHasherMocked.generateHash).toBeCalledTimes(1)

    })



})