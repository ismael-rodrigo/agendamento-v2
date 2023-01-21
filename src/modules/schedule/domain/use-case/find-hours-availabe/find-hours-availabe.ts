import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors-handler/app-error";
import { Left, Right } from "../../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../../errors-handler/errors/invalid-params-error";
import { IHoursRepository } from "../../port/hours-repository.interface";
import { VerifyHoursAvailableDTO } from "./find-hours-available-DTO";



@injectable()
export class FindHoursByDateServiceAvailableUseCase {
    constructor( 
        @inject("HoursRepository") private hoursRepository:IHoursRepository 
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