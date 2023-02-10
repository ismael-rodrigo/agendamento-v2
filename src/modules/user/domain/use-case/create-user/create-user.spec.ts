import { beforeEach, describe, expect, it } from "vitest";
import { prismaMocked } from "../../../../../../prisma/__mocks__";
import { UserRepositoryPrisma } from "../../../../../external/repository/user-repository-prisma";
import { PasswordEncryptProvider } from "../../../../../shared/adapters/password-encrypt-provider/password-encrypt";
import { AppError } from "../../../../../shared/errors-handler/errors/app-error";
import { CreateUserUseCase } from "./create-user";

describe('create user with prisma implementation', ()=>{
    describe('create new user with valid params' , ()=>{
        const prismaRepo = new UserRepositoryPrisma(prismaMocked) 
        const createUserUseCase = new CreateUserUseCase( prismaRepo , new PasswordEncryptProvider() )
        
        it('should be create user with valid params' , async ()=>{
            expect( await prismaMocked.user.count()).toBe(0)
            const validUsername = "ismael123"
            const validPassword = "ismael@@123"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(false)
            if(result.isLeft()) return
            expect( await prismaMocked.user.count()).toBe(1)
            expect(result.value.id).toBeTruthy()
            expect(result.value.username).toEqual(validUsername)
        
        })

        it('should be create user with password caracter especials' , async ()=>{
            const validUsername = "ismael"
            const validPassword = "i1!#@%$&*()_"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            
            if(!result.isLeft()) return

            expect(result.isLeft()).toEqual(false)
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(1)

        })






    })
    describe('create new user with invalid params' , ()=>{
        let prismaRepo:UserRepositoryPrisma
        let createUserUseCase:CreateUserUseCase

        beforeEach(()=>{
            prismaRepo = new UserRepositoryPrisma(prismaMocked) 
            createUserUseCase = new CreateUserUseCase( prismaRepo , new PasswordEncryptProvider() )
        })


        it('should be not create user with null params' , async ()=>{

            const result = await createUserUseCase.execute({
            } as {username:string , password:string} )
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })

        it('should be not create user with null espaces in username' , async ()=>{
            const validUsername = "ismael rodrigo"
            const validPassword = "senha@bael123"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })

        it('should be not create user with username length small to 6 caracter' , async ()=>{
            const validUsername = "ismae"
            const validPassword = "senha@bael123"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })


        it('should be not create user with password lenth small to 8 caracter' , async ()=>{
            const validUsername = "ismael"
            const validPassword = "ismael"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })

        it('should be not create user with password lenth bigger to 15 caracter' , async ()=>{
            const validUsername = "ismael"
            const validPassword = "ismaelrodrigosou"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })

        it('should be not create user with null espaces in password' , async ()=>{
            const validUsername = "ismael"
            const validPassword = "ismael rodrigo"
            const result = await createUserUseCase.execute({
                username:validUsername,
                password:validPassword
            })
            expect(result.isLeft()).toEqual(true)
            if(!result.isLeft()) return
            expect(result.error).instanceOf(AppError)
            expect( await prismaMocked.user.count()).toBe(0)
        })



    })
})