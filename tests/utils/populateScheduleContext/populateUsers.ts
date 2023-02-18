import { Uuid } from './../../../src/shared/entities/uuid';
import { PrismaClient } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { getOldDate } from '../get-dates';
export const createUser = async ( prisma:PrismaClient , email:string )=>{
    const userUnScheduledOrError =  await prisma.commomUser.create({
        data:{
            id:Uuid.create().value,
            cpf:cpf.generate(),
            email:email,
            name:'ismael Rodrigo',
            phone_number:'85981050647',
            date_birth: getOldDate(10)
        }
    })    
    return userUnScheduledOrError
}