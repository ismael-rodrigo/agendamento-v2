import { Right } from '@shared/errors-handler/either';
import { Left } from "@shared/errors-handler/either";
import { ILocationsRepository } from "@domain/_ports/repository/locations-repository.interface";
import { FindLocationsResponse } from "./find-locations-DTO";

export class FindLocations {
    
    constructor ( private readonly locationsRepo:ILocationsRepository ){}

    async execute():Promise<FindLocationsResponse>{
        const result = await this.locationsRepo.findMany()
        if(result.isLeft()){
            return Left.create(result.error)
        }
        return Right.create(result.value)
    }

}