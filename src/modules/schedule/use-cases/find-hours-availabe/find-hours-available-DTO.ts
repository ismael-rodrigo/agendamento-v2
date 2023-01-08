import { HourAvailable } from "@prisma/client"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"



export type HoursAvailables = {
    date: Date
    hours:HourAvailable[]
}


export namespace VerifyHoursAvailableDTO {
    export type request = {
        service_id: string
        date_consulted: Date
    }

    export type response = Either < InvalidParamsError , HoursAvailables >

}