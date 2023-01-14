import { Schedule } from "../../../../entities/schedule/schedule";
import { Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { ICommonUserRepository } from "../../repositories/common-user/common-user-repository.interface";
import { HoursPrismaRepository } from "../../repositories/hours/hours-repository-prisma";
import { IHoursRepository } from "../../repositories/hours/hours-repository.interface";
import { IScheduleRepository } from "../../repositories/schedule/schedule-repository.interface";
import { IServiceRepository } from "../../repositories/service/service-repository.interface";
import { CreateScheduleDTO } from "./create-schedule-DTO";

export class CreateSchedule {
    constructor(
        private scheduleRepo:IScheduleRepository , 
        private commonUserRepo:ICommonUserRepository ,
        private serviceRepo:IServiceRepository ,
        private hoursRepo:IHoursRepository
        ){}

    async execute({ date , hour_id ,service_id , user_id}: CreateScheduleDTO.request): Promise<CreateScheduleDTO.response> {
    
        const userAlreadyExists = await this.commonUserRepo.findUserById(user_id)
        if(userAlreadyExists.isLeft()) return Left.create(userAlreadyExists.error)
        if(!userAlreadyExists.value) return Left.create(new InvalidParamsError('User not exists' , 'USER_NOT_EXISTS'))
        
        const serviceAlreadyExists = await this.serviceRepo.findServiceById(service_id)
        if(serviceAlreadyExists.isLeft()) return Left.create(serviceAlreadyExists.error)
        if(!serviceAlreadyExists.value) return Left.create(new InvalidParamsError('Service not exists', 'SERVICE_NOT_EXISTS'))

        const hourAlreadyExists = await this.hoursRepo.findHoursById(hour_id)
        if(hourAlreadyExists.isLeft()) return Left.create(hourAlreadyExists.error)
        if(!hourAlreadyExists.value) return Left.create(new InvalidParamsError('Hour not exists', 'HOUR_NOT_EXISTS'))

        const schedule = Schedule.create({
            date, 
            hour_id,
            service_id, 
            user_id
        })

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