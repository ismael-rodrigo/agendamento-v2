import { IHoursRepository } from '@domain/_ports/repository/hours-repository.interface';
import { Left, Right } from '@shared/errors-handler/either';
import { HourAvailable } from './../../../_entities/hours/hour-available';
import { CreateHourAvailableRequest } from './create-hour-available-DTO';

export default class CreateHourAvailableUseCase {
    constructor(private readonly hourAvailableRepo:IHoursRepository){}
    async execute({ hour ,minutes , service_id , enable}: CreateHourAvailableRequest){
        const hourAvailableOrError = HourAvailable.create({ hour ,minutes , service_id , enable })
        if(hourAvailableOrError.isLeft()) return Left.create(hourAvailableOrError.error)

        const hourSavedOrError = await this.hourAvailableRepo.add(hourAvailableOrError.value.value)
        if(hourSavedOrError.isLeft()) return Left.create(hourSavedOrError.error)
        return Right.create(hourAvailableOrError.value.value)
    }
}