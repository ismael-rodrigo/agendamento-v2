import { Schedule } from "../../../../entities/schedule/schedule";
import { Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { ICommonUserRepository } from "../../repositories/common-user/common-user-repository.interface";
import { IScheduleRepository } from "../../repositories/schedule/schedule-repository.interface";
import { CreateScheduleDTO } from "./create-schedule-DTO";

export class CreateSchedule {
    constructor(
        private scheduleRepo:IScheduleRepository , 
        private commonUserRepo:ICommonUserRepository
        ){}

    async execute({date , hour_id ,service_id , user_id}: CreateScheduleDTO.request): Promise<CreateScheduleDTO.response> {
        
        const schedule = Schedule.create({
            date, 
            hour_id,
            service_id, 
            user_id
        })
        const userAlreadyExists = await this.commonUserRepo.findUser(user_id)
        if(!userAlreadyExists){
            return Left.create(new InvalidParamsError('User not exists' , 'USER_NOT_EXISTS'))
        }

        
        if(schedule.isLeft()){
            return Left.create(schedule.error)
        }

        const result = await this.scheduleRepo.createSchedule(schedule.value)
        if(result.isLeft()){
            return Left.create(result.error)
        }

        return Right.create(result.value)
    }

}