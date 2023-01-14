
import { HoursData } from "../../../../entities/hours/hours-data"
import { AppError } from "../../../../errors-handler/app-error"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"



export type HoursAvailables = {
    date: Date
    hours:HoursData[]
}


export namespace VerifyHoursAvailableDTO {
    export type request = {
        service_id: string
        date_consulted: Date
    }

    export type response = Either < InvalidParamsError | AppError , HoursAvailables >

}