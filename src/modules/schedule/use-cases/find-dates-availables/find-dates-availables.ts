
import { inject, injectable } from "tsyringe";
import { Left, Right } from "../../../../errors-handler/either";
import { getDaysArray } from "../../../../utils/dates-utils/get-array-of-dates-between-two-dates";
import { DatesAvailables, FindDatesDTO } from "./find-dates-available-DTO";
import { IScheduleRepository } from "../../repositories/schedule/schedule-repository.interface"
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";


@injectable()
export class FindDatesServiceAvailableUseCase {
    constructor(@inject("ScheduleRepository") private scheduleRepository: IScheduleRepository  ){}

    async execute( { service_id } : FindDatesDTO.request ) : Promise < FindDatesDTO.response >
    {
        if(!service_id){
            return Left.create(new InvalidParamsError)
        }

        const intervalDatesAvailable = await this.scheduleRepository.findCurrentIntervalSchedulesAvailable(service_id)
        if(!intervalDatesAvailable){
            return Right.create([] as DatesAvailables[])
        }

        const datesIntervaled = getDaysArray(intervalDatesAvailable?.intial_date , intervalDatesAvailable?.final_date)

        const dates = await Promise.all( datesIntervaled.map( async (date) => {
            const allHoursOfService = await this.scheduleRepository.findAllHoursAvailableByServiceId(service_id, date)
            const schedulesCreated = await this.scheduleRepository.findSchedulesByDateAndServiceId(service_id , date)
            if(allHoursOfService.length > schedulesCreated.length ) {
                return { date, is_available:true }
            }
            return { date, is_available:false }
        }))

        return Right.create(dates)
    }
}