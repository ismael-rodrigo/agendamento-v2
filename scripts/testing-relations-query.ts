import "reflect-metadata"
import "../shared/container"

import { container } from "tsyringe"
import { CommomUserPrismaRepository } from "../src/external/repository/common-user/common-user-repository-prisma"
import { CreateCommonUser } from "../src/modules/schedule/domain/use-case/create-common-user/create-common-user"
import { prisma } from "../src/external/prisma-client/client"




const dev = async ()=>{


const service_id= ""
const repo = new CommomUserPrismaRepository( prisma )

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