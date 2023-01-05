import "reflect-metadata"
import "../shared/container"
import "express-async-errors"


import { container } from "tsyringe"
import { FindDatesServiceAvailableUseCase } from "../modules/schedule/use-cases/find-dates-availables-use-case"



const dev = async ()=>{


const service_id= "ac933cab-f074-4943-9760-412a510b6cd3"

try{
    const result = container.resolve(FindDatesServiceAvailableUseCase)
    await result.execute({ service_id })
}
catch (err){
    console.log(err)
}



}

dev()