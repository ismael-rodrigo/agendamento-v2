import { beforeEach, describe, expect, it } from "vitest";
import { getOldDate } from "../../../../../../tests/utils/get-dates";
import { BirthDate } from "../../../../../shared/entities/utils/birth-date";
import { Cpf } from "../../../../../shared/entities/utils/cpf";
import { Name } from "../../../../../shared/entities/utils/name";
import { Phone } from "../../../../../shared/entities/utils/phone";
import { Uuid } from "../../../../../shared/adapters/uuid-generator/uuid";
import { CommomUserInMemoryRepository } from "../../../adapter/repository/common-user/common-user-repository-in-memory";
import { CreateCommonUser } from "./create-common-user";
import { CreateCommonUserDTO } from "./create-common-user-DTO";

describe('create common user', ()=>{
    describe('Create common user with valid params',()=>{
        const validParams:CreateCommonUserDTO.request = {
            cpf:"07328011335",
            date_birth:getOldDate(10),
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        }


        it('should be able to common user with valid params',async ()=>{
            const repoMemory = new CommomUserInMemoryRepository()
            const sut = new CreateCommonUser(repoMemory)

            const resultOrError = await sut.execute(validParams)

            expect(resultOrError.isLeft()).toEqual(false)
            if(resultOrError.isLeft()) return

            expect(Uuid.validate(resultOrError.value.id)).toEqual(true)

            expect(Cpf.validate(resultOrError.value.cpf)).toEqual(true)
            expect(resultOrError.value.cpf).toEqual(validParams.cpf)

            expect(Phone.validate(resultOrError.value.phone_number)).toEqual(true)
            expect(resultOrError.value.phone_number).toEqual(validParams.phone_number)

            expect(BirthDate.validate(resultOrError.value.date_birth)).toEqual(true)
            expect(resultOrError.value.date_birth).toEqual(validParams.date_birth)

            expect(Name.validate(resultOrError.value.name)).toEqual(true)
            expect(resultOrError.value.name).toEqual(validParams.name)

            expect(repoMemory.commmonUsers.length).toEqual(1)

        })

    })

    describe('Create common user with invalid params',()=>{
        let sut:CreateCommonUser
        let repoMemory:CommomUserInMemoryRepository
        beforeEach(()=>{
            repoMemory = new CommomUserInMemoryRepository()
            sut = new CreateCommonUser(repoMemory)
        })
        it('should be able to common user with invalid cpf', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"2222222",
                date_birth:getOldDate(10),
                name:"Ismael Rodrigo",
                phone_number:"85981050647"
            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })

        it('should be able to common user with invalid date birth', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"07328011335",
                date_birth: new Date(),
                name:"Ismael Rodrigo",
                phone_number:"85981050647"
            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })

        it('should be able to common user with invalid name', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"07328011335",
                date_birth: getOldDate(10),
                name:"21321 123",
                phone_number:"85981050647"
            }
            const resultOrError = await sut.execute(invalidParams)
            expect(resultOrError.isLeft()).toEqual(true)
        })
        it('should be able to common user with phone number', async ()=>{
            const invalidParams:CreateCommonUserDTO.request = {
                cpf:"07328011335",
                date_birth: getOldDate(10),
                name:"Ismael Rodrigo",
                phone_number:"0000000000000"
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