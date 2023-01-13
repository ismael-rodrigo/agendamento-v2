import { CreateScheduleData } from "../../../../entities/schedule/schedule-data"
import { AppError } from "../../../../errors-handler/app-error"
import { Either } from "../../../../errors-handler/either"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error"


export namespace CreateScheduleDTO {
    export type request  = CreateScheduleData
    export type response = Either< AppError | InvalidParamsError , CreateScheduleData >
}