import { AppError } from "../../../../../../shared/errors-handler/errors/app-error"
import { Either } from "../../../../../../shared/errors-handler/either"
import { InvalidParamsError } from "../../../../../../shared/errors-handler/errors/invalid-params-error"
import { ScheduleData } from "../../../entity/schedule/schedule-data"



export namespace CreateScheduleDTO {
    export type request  = {
        user_id :string
        service_id :string
        hour_id :string
        date :Date
    }

    export type response = Either< AppError | InvalidParamsError , ScheduleData >
}