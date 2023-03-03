import { Left, Right } from '@shared/errors-handler/either';
import { Location } from './../../../_entities/location/location';
import { ILocationsRepository } from '@domain/_ports/repository/locations-repository.interface';
import { CreateLocationRequest } from "./create-location-DTO";

export class CreateLocationUseCase {
    constructor(private readonly locationRepo:ILocationsRepository){}
    async execute({ address , name }:CreateLocationRequest){
        const locationOrError = Location.create({address , name})
        if(locationOrError.isLeft()) return Left.create(locationOrError.error)
        const locationSavedOrError = await this.locationRepo.add(locationOrError.value.value)
        if(locationSavedOrError.isLeft()) return Left.create(locationSavedOrError.error)
        
        return Right.create(locationOrError.value.value)
    }
}