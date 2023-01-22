import { AppError } from "../../../../../shared/errors-handler/errors/app-error"
import { Either } from "../../../../../shared/errors-handler/either"
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error"
import { CreateScheduleData } from "../../entity/schedule/schedule-data"



export namespace CreateScheduleDTO {
    export type request  = CreateScheduleData
    export type response = Either< AppError | InvalidParamsError , CreateScheduleData >
}