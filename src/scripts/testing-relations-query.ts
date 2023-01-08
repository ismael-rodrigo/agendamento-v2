import "reflect-metadata"
import "../shared/container"

import { container } from "tsyringe"
import { FindDatesServiceAvailableUseCase } from "../modules/schedule/use-cases/find-dates-availables/find-dates-availables"
import { CreateCommonUser } from "../modules/schedule/use-cases/create-common-user/create-common-user"
import { CommomUserPrismaRepository } from "../modules/schedule/repositories/common-user/common-user-repository-prisma"
import { prisma } from "../prisma-client/client"



const dev = async ()=>{


const service_id= ""
const repo = new CommomUserPrismaRepository(prisma)

const userusecase = new CreateCommonUser(repo)

const date = new Date(2000)

console.log(date)

const user_created = await userusecase.execute({
    cpf:"58089497349",
    date_birth:date,
    name:"Samuel",
    phone_number:"85981050647",

})

if(user_created.isLeft()){
    return console.log(user_created.error.getJsonResponse())
}

console.log(user_created.value)

}

dev()