import "reflect-metadata"
import "../shared/container"
import "express-async-errors"


import { container } from "tsyringe"
import { FindDatesServiceAvailableUseCase } from "../modules/schedule/use-cases/find-dates-availables/find-dates-availables"



const dev = async ()=>{


const service_id= "03800f20-9eb7-43bc-842c-a51262a7af38"

try{
    const result = container.resolve(FindDatesServiceAvailableUseCase)
    const result2 = await result.execute({ service_id })
    console.log(result2)
}
catch (err){
    console.log(err)
}



}

dev()