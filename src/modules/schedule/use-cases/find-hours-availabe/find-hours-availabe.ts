import { HourAvailable } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { VerifyHoursAvailableDTO } from "./find-hours-available-DTO";
import { IScheduleRepository } from "../../repositories/schedule-repository.interface"
import { Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";





@injectable()
export class FindHoursByDateServiceAvailableUseCase {
    constructor(@inject("ScheduleRepository") private scheduleRepository: IScheduleRepository  ){}

    async execute( { date_consulted , service_id } : VerifyHoursAvailableDTO.params ): Promise<VerifyHoursAvailableDTO.returned>
    {
        if(!date_consulted || !service_id ){
            return Left.create( new InvalidParamsError )
        }
        const result = await this.scheduleRepository.findHoursAvailableOfService({ date_consulted , service_id })
        return Right.create({
            date:date_consulted,
            hours:result
        })

    }


}