
import { inject, injectable } from "tsyringe";
import { Left, Right } from "../../../../errors-handler/either";
import { getDaysArray } from "../../../../utils/dates-utils/get-array-of-dates-between-two-dates";
import { DatesAvailables, FindDatesDTO } from "./find-dates-available-DTO";
import { IScheduleRepository } from "../../repositories/schedule/schedule-repository.interface"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { IHoursRepository } from "../../repositories/hours/hours-repository.interface";
import { AppError } from "../../../../errors-handler/app-error";


@injectable()
export class FindDatesServiceAvailableUseCase {
    constructor(
        @inject("ScheduleRepository") private scheduleRepository: IScheduleRepository  ,
        @inject("HoursRepository") private hoursRepository : IHoursRepository
        ){}

    async execute( { service_id } : FindDatesDTO.request ) : Promise < FindDatesDTO.response >
    {
        if(!service_id){
            return Left.create(new InvalidParamsError)
        }

        const intervalDatesAvailable = await this.scheduleRepository.findCurrentIntervalSchedulesAvailable(service_id)
        if(intervalDatesAvailable.isLeft()) return Left.create(new InvalidParamsError(intervalDatesAvailable.error.detail ,intervalDatesAvailable.error.type ))
        if(!intervalDatesAvailable.value){
            return Right.create([] as DatesAvailables[])
        }

        const datesIntervaled = getDaysArray(intervalDatesAvailable.value.intial_date , intervalDatesAvailable.value.final_date)

        if(datesIntervaled.isLeft()){
            return Left.create(new InvalidParamsError(datesIntervaled.error.detail ,datesIntervaled.error.type ))
        }

        const dates = await Promise.all( datesIntervaled.value.map( async (date) => {
            if(date <= new Date){
                return { date , is_available: false } as DatesAvailables
            }
            
            const allHoursInDate = await this.hoursRepository.findAllHoursInDate(service_id, date)
            if(allHoursInDate.isLeft()) {
                throw new AppError('Error run as findAllHoursInDate in map', 'findAllHoursInDate')
            }
            const schedulesCreated = await this.scheduleRepository.findSchedulesByDateAndServiceId(service_id , date)
            if(allHoursInDate.value.length > schedulesCreated.length ) {
                return { date , is_available: true } as DatesAvailables
            }
            return { date , is_available: false } as DatesAvailables
        }))

        return Right.create(dates)
    }
}