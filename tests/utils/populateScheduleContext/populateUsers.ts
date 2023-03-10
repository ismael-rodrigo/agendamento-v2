import { CommonUserData } from '@domain/_entities/common-user/commom-user-data';
import { PasswordEncryptProvider } from './../../../src/external/password-encrypt-provider/password-encrypt';
import { Password } from '../../../src/shared/entities/password/password';
import { Uuid } from '../../../src/shared/entities/uuid/uuid';
import { PrismaClient } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';

export const createUser = async ( prisma:PrismaClient , email:string )  =>{
    const pass = await Password.createHashed(new PasswordEncryptProvider() , 'Ismael123')
    if(pass.isLeft()) throw new Error
    
    const userUnScheduledOrError =  await prisma.commomUser.create({
        data:{
            password:pass.value.value,
            id:Uuid.create().value,
            cpf:cpf.generate(),
            email:email,
            name:'ismael Rodrigo',
            phone_number:'85981050647',
        }
    })    
    return userUnScheduledOrError
}