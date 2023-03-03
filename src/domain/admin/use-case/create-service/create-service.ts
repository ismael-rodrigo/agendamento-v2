import { IServiceRepository } from '@domain/_ports/repository/service-repository.interface';
import { Left, Right } from '@shared/errors-handler/either';
import { Service } from '@domain/_entities/service/service';
import { CreateServiceRequest } from './create-service-DTO';

export default class CreateServiceUseCase {
    constructor(private readonly serviceRepo: IServiceRepository){}
    async execute( { location_id  , service_name }: CreateServiceRequest){
        const serviceOrError = Service.create({location_id  , service_name})
        if(serviceOrError.isLeft()) return Left.create(serviceOrError.error)

        const serviceSavedOrError = await this.serviceRepo.add(serviceOrError.value.value)
        if(serviceSavedOrError.isLeft()) return Left.create(serviceSavedOrError.error)
        
        return Right.create(serviceOrError.value.value)
    }
}