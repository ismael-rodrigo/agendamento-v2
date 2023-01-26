import { CreateUserData } from './../../entity/user-data';
import { LoginUserUseCase } from './login-user';
import { prismaMocked } from './../../../../../../prisma/__mocks__/index';
import { PasswordEncryptProvider } from './../../../../../shared/adapters/password-encrypt-provider/password-encrypt';
import { describe, expect, it } from "vitest";
import { User } from "../../entity/user";
import { UserRepositoryPrisma } from '../../../../../external/repository/user-repository-prisma';
import { JwtProvider } from '../../../../../shared/adapters/jwt-provider/jwt-provider';

describe('login user',()=>{
    it('login user with params valid it user valid',async ()=>{

        const user:CreateUserData = {
            username:'ismael',
            password:'ismael123'
        }

        const newUser = await User.create(new PasswordEncryptProvider(), user )
        expect(newUser.isLeft()).toEqual(false)
        if(newUser.isLeft())return
        
        const userRepo = new UserRepositoryPrisma(prismaMocked)
        expect(await prismaMocked.user.count()).toEqual(0)
        const userCreated = await userRepo.createUser({ id:newUser.value.id.value , username:newUser.value.username.value , password:newUser.value.password.value })
        expect(( userCreated).isLeft()).toEqual(false)
        if(userCreated.isLeft()) return
        expect(await prismaMocked.user.count()).toEqual(1)

        const loginUseCase = new LoginUserUseCase(userRepo , new PasswordEncryptProvider , new JwtProvider)
        const result = await loginUseCase.execute(user)
        expect((result).isLeft()).toEqual(false)
        if(result.isLeft())return
    })
})