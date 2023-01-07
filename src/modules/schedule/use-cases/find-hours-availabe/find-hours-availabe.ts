import { HourAvailable } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { VerifyHoursAvailableDTO } from "../../dtos/find-hours-available-DTO";
import { IScheduleRepository } from "../../repositories/schedule-repository.interface"





@injectable()
export class FindHoursByDateServiceAvailableUseCase {
    constructor(@inject("ScheduleRepository") private scheduleRepository: IScheduleRepository  ){}

    async execute( { date_consulted , service_id } : VerifyHoursAvailableDTO.params ): Promise<HourAvailable[]>
    {
        const result = await this.scheduleRepository.findHoursAvailableOfService({date_consulted , service_id})
        return result
    }


}