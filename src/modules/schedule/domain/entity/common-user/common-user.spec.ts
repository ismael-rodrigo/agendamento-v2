import { describe, expect, it} from 'vitest'
import { getOldDate } from '../../../../../../tests/utils/get-dates'
import { InvalidCpfError } from '../../../../../shared/entities/utils/errors/invalid-cpf-error'
import { invalidBirthDateError } from '../../../../../shared/entities/utils/errors/invalid-date-birth-date'
import { InvalidNameError } from '../../../../../shared/entities/utils/errors/invalid-name-error'
import { InvalidPhoneError } from '../../../../../shared/entities/utils/errors/invalid-phone-error'
import { CommomUser } from './common-user'



describe('create common user', ()=>{
    it('create common user with correct values' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(false);
        if(commonUser.isLeft()) return
        expect(commonUser.value.cpf.value).toEqual("07328011335")
        expect(commonUser.value.name.value).toEqual("Ismael Rodrigo")
        expect(commonUser.value.phone_number.value).toEqual("85981050647")
        expect(commonUser.value.date_birth.value).toEqual(brithDate)
        expect(commonUser.value.id.value).toBeTruthy()
    })}
)

 

describe('not create common user with cpf invalid', ()=>{

    it('should not be able to create common user with cpf null' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidCpfError)
    })

    it('should not be able to create common user with cpf invalid' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"00000000000",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidCpfError)
    })



})    

describe('not create common user with name invalid' , ()=>{
    it('should not be able to create common user with name lenght smaller to 2 character' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"i",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidNameError)
    })

    it('should not be able to create common user with name with number character' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"isma3l",
            phone_number:"85981050647"
        })
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidNameError)
    })
    it('should not be able to create common user with name with espaces character' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"         ",
            phone_number:"85981050647"
        })
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidNameError)
    })

    it('should not be able to create common user with name with lenght bigger for 70 characters' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"ismael rodrigo sousa brasil ddddddddddd ddddddddd ddddddddddd dddddddddd",
            phone_number:"85981050647"
        })
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidNameError)
    })
})

describe('not create common user with phone number invalid', ()=>{

    it('should not be able to create common user with phone number null' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:""
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidPhoneError)
    })

    it('should not be able to create common user with (DDD) of phone number invalid' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"00981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidPhoneError)
    })
    
    it('should not be able to create common user with phone number invalid' , ()=>{
        const brithDate = getOldDate(10)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85002200220"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(InvalidPhoneError)
    })
})    


    
describe('not create common user with birth date invalid', ()=>{

    it('should not be able to create common user with years bigger of 120 years' , ()=>{
        const brithDate = getOldDate(121)
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(invalidBirthDateError)
    })

    it('should not be able to create common user with date birth before or equal to current date' , ()=>{
        const brithDate = new Date()
        const commonUser = CommomUser.create({
            cpf:"07328011335",
            date_birth: brithDate,
            name:"Ismael Rodrigo",
            phone_number:"85981050647"
        })
    
        expect(commonUser.isLeft()).toEqual(true);
        if(!commonUser.isLeft()) return
        expect(commonUser.error).instanceOf(invalidBirthDateError)
    })

})




