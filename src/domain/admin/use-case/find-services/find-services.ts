import { AppError } from '@shared/errors-handler/errors/app-error';
import { Left, Right, Either } from '@shared/errors-handler/either';
import { IServiceRepository } from '@domain/_ports/repository/service-repository.interface';
import { FindServicesRequest, FindServicesResponse } from './find-services-DTO';

export default class FindServicesUseCase {
    constructor(private readonly serviceRepo: IServiceRepository){}
    
    async execute({ service_id  , location_id }:FindServicesRequest):Promise<Either<AppError , FindServicesResponse>>{
        const servicesOrError = await this.serviceRepo.query({service_id  , location_id})
        if(servicesOrError.isLeft()) return Left.create(servicesOrError.error)

        return Right.create(servicesOrError.value)
    }
} 