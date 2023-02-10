import { User } from './../../../../user/domain/entity/user';

import { LoginUserUseCase } from './login-user';
import { prismaMocked } from './../../../../../../prisma/__mocks__/index';
import { PasswordEncryptProvider } from './../../../../../shared/adapters/password-encrypt-provider/password-encrypt';
import { describe, expect, it } from "vitest";

import { UserRepositoryPrisma } from '../../../../../external/repository/user-repository-prisma';
import { JwtProvider } from '../../../../../shared/adapters/jwt-provider/jwt-provider';
import { CredentialsInvalidError } from '../../../../../shared/errors-handler/errors/credentials-invalid-error';
import { beforeEach } from 'vitest';
import { IUserRepository } from '../../../../user/domain/port/user-repository.interface';
import { CreateUserData } from '../../../../user/domain/entity/user-data';


describe('login user',()=>{
    let userRepo:IUserRepository
    let user:CreateUserData = {
        username:'ismael',
        password:'ismael123'
    }
    beforeEach(async ()=>{

        const newUser = await User.create(new PasswordEncryptProvider() , user )
        expect(newUser.isLeft()).toEqual(false)
        if(newUser.isLeft()) return
        
        userRepo = new UserRepositoryPrisma(prismaMocked)
        expect(await prismaMocked.user.count()).toEqual(0)
        const userCreated = await userRepo.createUser({ id:newUser.value.id.value , username:newUser.value.username.value , password:newUser.value.password.value })
        expect(( userCreated).isLeft()).toEqual(false)
        if(userCreated.isLeft()) return
        expect(await prismaMocked.user.count()).toEqual(1)

    })


    it('should be login user with params valid it user valid',async ()=>{

        const loginUseCase = new LoginUserUseCase(userRepo , new PasswordEncryptProvider , new JwtProvider)
        const result = await loginUseCase.execute(user)
        expect((result).isLeft()).toEqual(false)
        if(result.isLeft()) return

        expect(result.value.access).toBeTruthy()
        expect(result.value.refresh).toBeTruthy()

    })


    it('should not be login user with invalid username',async ()=>{

        const userLogin:CreateUserData = {
            username:'samuel',
            password:'ismael123'
        }

        const loginUseCase = new LoginUserUseCase(userRepo , new PasswordEncryptProvider , new JwtProvider)
        const result = await loginUseCase.execute(userLogin)
        expect(result.isLeft()).toEqual(true)
        if(!result.isLeft())return

        expect(result.error).toBeInstanceOf(CredentialsInvalidError)


    })


    it('should not be login user with invalid password',async ()=>{

        const userLogin:CreateUserData = {
            username:'ismael',
            password:'samuel123'
        }


        const loginUseCase = new LoginUserUseCase( userRepo , new PasswordEncryptProvider , new JwtProvider)
        const result = await loginUseCase.execute(userLogin)
        expect(result.isLeft()).toEqual(true)
        if(!result.isLeft()) return

        expect(result.error).toBeInstanceOf(CredentialsInvalidError)


    })
})