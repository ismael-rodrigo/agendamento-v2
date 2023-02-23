import { Left, Right } from "@domain/../shared/errors-handler/either";
import { InvalidParamsError } from "@domain/../shared/errors-handler/errors/invalid-params-error";
import { IHoursRepository } from "@domain/_ports/repository/hours-repository.interface";
import { VerifyHoursAvailableDTO } from "./find-hours-available-DTO";


export class FindHoursByDateServiceAvailableUseCase {
    constructor( 
        private hoursRepository:IHoursRepository 
        ){}

    async execute( { date_consulted , service_id } : VerifyHoursAvailableDTO.request ): Promise<VerifyHoursAvailableDTO.response>
    {
        if(!date_consulted || !service_id ){
            return Left.create( new InvalidParamsError )
        }
        const result = await this.hoursRepository.findHoursAvailableInDate( service_id , date_consulted )

        if(result.isLeft()){
            return Left.create(result.error)
        }

        return Right.create({
            date:date_consulted,
            hours:result.value
        })
    }
}