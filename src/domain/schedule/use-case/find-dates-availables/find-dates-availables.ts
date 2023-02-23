import { IConfigsSchedulesRepository } from '@domain/_ports/repository/configs-schedules-repository.interface';
import { getDaysArray } from "@shared/utils/dates-utils/get-array-of-dates-between-two-dates";
import { AppError } from "@shared/errors-handler/errors/app-error";
import { Left, Right } from "@shared/errors-handler/either";
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error";
import { IHoursRepository } from "@domain/_ports/repository/hours-repository.interface";
import { IScheduleRepository } from "@domain/_ports/repository/schedule-repository.interface";
import { DatesAvailables, FindDatesDTO } from "./find-dates-available-DTO";
import { DateAvailable } from '@domain/_entities/date-available/date-available';


export class FindDatesAvailableUseCase {
    constructor(
        private scheduleRepository: IScheduleRepository  ,
        private hoursRepository : IHoursRepository , 
        private configsRepo : IConfigsSchedulesRepository
        ){}

    async execute( { service_id } : FindDatesDTO.request ) : Promise < FindDatesDTO.response >
    {
        if(!service_id){
            return Left.create(new InvalidParamsError)
        }

        const intervalDatesAvailable = await this.configsRepo.findIntervalAvailable(service_id)
        if(intervalDatesAvailable.isLeft()) return Left.create(new InvalidParamsError( intervalDatesAvailable.error.detail ,intervalDatesAvailable.error.type ))
        if(!intervalDatesAvailable.value){
            return Right.create([] as DatesAvailables[])
        }

        const datesIntervaled = getDaysArray(intervalDatesAvailable.value.intial_date , intervalDatesAvailable.value.final_date)

        if(datesIntervaled.isLeft()){
            return Left.create(new InvalidParamsError(datesIntervaled.error.detail ,datesIntervaled.error.type ))
        }

        const datesAvailableOrError = new DateAvailable()

        await Promise.all( datesIntervaled.value.map( async (date) => {
            
            if(date <= new Date){
                return datesAvailableOrError.push(date , false)
            }

            const allHoursInDate = await this.hoursRepository.findAllHoursInDate( service_id, date )
            if(allHoursInDate.isLeft()) {
                return datesAvailableOrError.setError(allHoursInDate.error)
            }
            const schedulesCreated = await this.scheduleRepository.findSchedulesByDateAndServiceId(service_id , date)
            if(schedulesCreated.isLeft()){
                return datesAvailableOrError.setError(schedulesCreated.error)
            }

            const dayDisabledConflict = await this.configsRepo.findDayDisabled(date.getDay() , service_id)
            if(dayDisabledConflict.isLeft()) return datesAvailableOrError.setError(dayDisabledConflict.error)
            if(dayDisabledConflict.value) return datesAvailableOrError.push(date , false)

            const dateDisabledConflict = await this.configsRepo.findDateDisabled(date , service_id)
            if(dateDisabledConflict.isLeft()) return Left.create(dateDisabledConflict.error)
            if(dateDisabledConflict.value) return datesAvailableOrError.push(date , false)

            datesAvailableOrError.handler( date , allHoursInDate.value , schedulesCreated.value )
        }))


        if(datesAvailableOrError.error instanceof AppError){
            return Left.create(datesAvailableOrError.error)
        }
        
        return Right.create(datesAvailableOrError.value)
    }
}