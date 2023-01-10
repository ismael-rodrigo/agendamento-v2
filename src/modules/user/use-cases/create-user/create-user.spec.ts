import "reflect-metadata"
import "../../../../shared/container"
import { container } from "tsyringe";
import { describe ,expect,it } from "vitest";
import { CreateUserUseCase } from "./create-user";


describe('Create User use case', ()=>{
    describe('create new user in db',async ()=>{
        const username = 'ghjghjghjlghjhh'
        const password = 'Senha@aosjd334'

        it('should to create new user',async ()=>{
            const sut = container.resolve(CreateUserUseCase)
            const resultOrError = await sut.execute({
                username,
                password
            })

            if(resultOrError.isLeft()){
                console.log(resultOrError.error)
            }


        }) 
    })
})