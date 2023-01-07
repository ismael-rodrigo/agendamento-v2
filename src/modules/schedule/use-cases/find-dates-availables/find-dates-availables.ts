
import { container, inject, injectable } from "tsyringe";
import { getDaysArray } from "../../../../utils/dates-utils/get-array-of-dates-between-two-dates";
import { FindDatesDTO } from "../../dtos/find-dates-available-DTO";
import { IScheduleRepository } from "../../repositories/schedule-repository.interface"
import { FindHoursByDateServiceAvailableUseCase } from "../find-hours-availabe/find-hours-availabe";





@injectable()
export class FindDatesServiceAvailableUseCase {
    constructor(@inject("ScheduleRepository") private scheduleRepository: IScheduleRepository  ){}

    async execute( { service_id } : FindDatesDTO.params ) : Promise <FindDatesDTO.returned[] | null>
    {
        const intervalDatesAvailable = await this.scheduleRepository.findCurrentIntervalSchedulesAvailable(service_id)
        if(!intervalDatesAvailable){
            return null
        }
        const datesIntervaled = getDaysArray(intervalDatesAvailable?.intial_date , intervalDatesAvailable?.final_date)

        const dates = await Promise.all( datesIntervaled.map( async (date) => {
            const allHoursOfService = await this.scheduleRepository.findAllHoursAvailableByServiceId(service_id, date)
            const schedulesCreated = await this.scheduleRepository.findSchedulesByDateAndServiceId(service_id , date)
            if(allHoursOfService.length > schedulesCreated.length ) {
                return {
                    date,
                    is_available:true
                }
            }
            return {
                date,
                is_available:false
            }
        }))
        return dates
    }
}