import { Either } from "@shared/errors-handler/either"
import { AppError } from "@shared/errors-handler/errors/app-error"
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error"
import { HourAvailableData } from "@domain/_entities/hours/hours-data"

export type HoursAvailables = {
    date: Date
    hours:HourAvailableData[]
}


export namespace VerifyHoursAvailableDTO {
    export type request = {
        service_id: string
        date_consulted: Date
    }

    export type response = Either < InvalidParamsError | AppError , HoursAvailables >

}