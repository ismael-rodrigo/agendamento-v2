import { AppError } from "../../../../../shared/errors-handler/app-error";
import { Left, Right } from "../../../../../shared/errors-handler/either";
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error";
import { IHoursRepository } from "../../port/repository/hours-repository.interface";
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
            return Left.create(new AppError(result.error.detail , result.error.type) )
        }

        return Right.create({
            date:date_consulted,
            hours:result.value
        })

    }


}