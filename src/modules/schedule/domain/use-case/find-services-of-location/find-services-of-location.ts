import { FindServicesOfLocationResponse, FindServicesOfLocationRequest } from './find-services-of-location-DTO';
import { Left, Right } from './../../../../../shared/errors-handler/either';
import { IServiceRepository } from "../../port/repository/service-repository.interface";

export class FindServicesOfLocation {
    constructor (private readonly serviceRepo:IServiceRepository){}

    async execute({location_id}:FindServicesOfLocationRequest):Promise<FindServicesOfLocationResponse>{
        const result = await this.serviceRepo.findServicesByLocationId(location_id)
        if(result.isLeft()){
            return Left.create(result.error)
        }
        return Right.create(result.value)
    }   
}