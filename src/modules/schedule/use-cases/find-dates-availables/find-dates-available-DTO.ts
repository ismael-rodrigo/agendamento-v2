import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"

export type DatesAvailables = {
    date: Date
    is_available: boolean
}



export namespace FindDatesDTO {
    export type params = { service_id: string } 

    export type returned = Either< InvalidParamsError , DatesAvailables[] >
}