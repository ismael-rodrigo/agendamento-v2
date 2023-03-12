import { JwtCommonUserProvider } from '../../../../external/jwt-provider/jwt-common-user-provider';
import { PasswordEncryptProvider } from '@external/password-encrypt-provider/password-encrypt'
import { BirthDate } from '@shared/entities/birth-date'
import { Cpf } from '@shared/entities/cpf'
import { Name } from '@shared/entities/name'
import { Phone } from '@shared/entities/phone'
import { Uuid } from '@shared/entities/uuid/uuid'

import { CommomUserInMemoryRepository } from '@external/repository/common-user/common-user-repository-in-memory'
import { getOldDate } from 'tests/utils/get-dates'
import {beforeEach, describe, expect,it} from 'vitest'
import { CreateCommonUserDTO } from './create-common-user-DTO'
import { RegisterCommonUser } from './create-common-user'


describe('create common user', ()=>{
    describe('Create common user with valid params',()=>{
        const validParams:CreateCommonUserDTO.request = {
            cpf:"07328011335",
            name:"Ismael Rodrigo",
            phone_number:"85981050647",
            email:'ismaelbrasil1@gmail.com',
            password:'Ismael1123'
        }


        it('should be able to common user with valid params',async ()=>{
            const repoMemory = new CommomUserInMemoryRepository()
            const passwordHasher = new PasswordEncryptProvider()
            const jwtProvider = new JwtCommonUserProvider()

            const sut = new RegisterCommonUser(repoMemory , passwordHasher, jwtProvider)

            const resultOrError = await sut.execute(validParams)

            expect(resultOrError.isLeft()).toEqual(false)
            if(resultOrError.isLeft()) return

            expect(Uuid.validate(resultOrError.value.user.id)).toEqual(true)

            expect(Cpf.validate(resultOrError.value.user.cpf)).toEqual(true)
            expect(resultOrError.value.user.cpf).toEqual(validParams.cpf)

            expect(Phone.validate(resultOrError.value.user.phone_number)).toEqual(true)
            expect(resultOrError.value.user.phone_number).toEqual(validParams.phone_number)
            expect(Name.validate(resultOrError.value.user.name)).toEqual(true)
            expect(resultOrError.value.user.name).toEqual(validParams.name.toUpperCase())

            expect(repoMemory.commmonUsers.length).toEqual(1)

        })

    })

    describe('Create common user with invalid params',()=>{
        let sut:RegisterCommonUser
        let repoMemory:CommomUserInMemoryRepository
        let jwtProvider = new JwtCommonUserProvider()
        beforeEach(()=>{
            const passwordHasher = new PasswordEncryptProvider()
            repoMemory = new CommomUserInMemoryRepository()
            sut = new RegisterCommonUser(repoMemory , passwordHasher , jwtProvider)
        })

        it('should be able to common user with invalid cpf', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"2222222",
                name:"Ismael Rodrigo",
                phone_number:"85981050647",
                email:'ismaelbrasil1@gmail.com',
                password:'ismael123'
            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })

        it('should be able to common user with invalid name', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"07328011335",
                name:"21321 123",
                phone_number:"85981050647",
                email:'ismaelbrasil1@gmail.com',
                password:'ismael123'

            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })
        it('should be able to common user with phone number', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"07328011335",
                name:"Ismael Rodrigo",
                phone_number:"0000000000000",
                email:'ismaelbrasil1@gmail.com',
                password:'ismael123'

            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })

        it('should be able to common user with nullable infos', async ()=>{
            const invalidParams = {}
            const resultOrError = await sut.execute(invalidParams as CreateCommonUserDTO.request)
            expect(resultOrError.isLeft()).toEqual(true)
        })

    })


})