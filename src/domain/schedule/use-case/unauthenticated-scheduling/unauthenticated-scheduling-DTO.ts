import { CreateUnauthenticatedUser } from './../../../_entities/unauthenticated-user/unauthenticated-user-data';
import { AppError } from "@shared/errors-handler/errors/app-error"
import { Either } from "@shared/errors-handler/either"
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error"
import { ScheduleData } from "@domain/_entities/schedule/schedule-data"

export type CreateUnauthenticatedScheduleRequest = {
    user : CreateUnauthenticatedUser
    service_id :string
    hour_id :string
    date :Date
}


export type CreateUnauthenticatedScheduleResponse = Either< AppError | InvalidParamsError , ScheduleData >

