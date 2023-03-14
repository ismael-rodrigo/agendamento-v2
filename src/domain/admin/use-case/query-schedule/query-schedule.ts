import { Left, Right } from '@shared/errors-handler/either';
import { QueryScheduleRequest } from './query-schedule-DTO';
import { IScheduleRepository } from '@domain/_ports/repository/schedule-repository.interface';


export class QueryScheduleUseCase {
    constructor(
        private readonly scheduleRepo:IScheduleRepository
    ){}
    async execute({cpf , date , location_id , service_id}:QueryScheduleRequest){
        const queryResultOrError = await this.scheduleRepo.query({cpf , date , location_id , service_id})
        if(queryResultOrError.isLeft()){
            return Left.create(queryResultOrError.error)
        }
        return Right.create(queryResultOrError.value)
    }
}