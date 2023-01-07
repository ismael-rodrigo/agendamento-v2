import "reflect-metadata"
import "../shared/container"

import { container } from "tsyringe"
import { FindDatesServiceAvailableUseCase } from "../modules/schedule/use-cases/find-dates-availables/find-dates-availables"



const dev = async ()=>{


const service_id= ""

const result = container.resolve(FindDatesServiceAvailableUseCase)
const result2 = await result.execute({ service_id })


if(result2)
console.log(result2)




}

dev()