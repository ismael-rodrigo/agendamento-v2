import { inject, injectable } from "tsyringe";
import { Schedule } from "../../../../entities/schedule/schedule";
import { AppError } from "../../../../errors-handler/app-error";
import { Left, Right } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { ICommonUserRepository } from "../../repositories/common-user/common-user-repository.interface";
import { IHoursRepository } from "../../repositories/hours/hours-repository.interface";
import { IScheduleRepository } from "../../repositories/schedule/schedule-repository.interface";
import { IServiceRepository } from "../../repositories/service/service-repository.interface";
import { CreateScheduleDTO } from "./create-schedule-DTO";

@injectable()
export class CreateSchedule {
    constructor(
        @inject('ScheduleRepository') private scheduleRepo:IScheduleRepository , 
        @inject('CommonUserRepository') private commonUserRepo:ICommonUserRepository ,
        @inject('ServiceRepository') private serviceRepo:IServiceRepository ,
        @inject('HoursRepository') private hoursRepo:IHoursRepository
        ){}

    async execute({ date , hour_id ,service_id , user_id}: CreateScheduleDTO.request): Promise<CreateScheduleDTO.response> {
    
        const intervalAvalilable = await this.scheduleRepo.findCurrentIntervalSchedulesAvailable(service_id)
        if(!intervalAvalilable) return Left.create(new AppError('Interval available not found in service' , 'NOT_INTERVAL_IN_SERVICE'))

        if(new Date(date) <= new Date()) return Left.create( new InvalidParamsError('Date is befored at current date', 'DATE_PROVIDED_INVALID') )
        if(new Date(date) > new Date(intervalAvalilable.final_date) || new Date(date) < new Date(intervalAvalilable.intial_date)){
            return Left.create( new InvalidParamsError('Date is out range in available schedules', 'DATE_PROVIDED_INVALID') )
        }

        const userAlreadyExists = await this.commonUserRepo.findUserById(user_id)
        if(userAlreadyExists.isLeft()) return Left.create(userAlreadyExists.error)
        if(!userAlreadyExists.value) return Left.create(new InvalidParamsError('User not exists' , 'USER_NOT_EXISTS'))
        
        const serviceAlreadyExists = await this.serviceRepo.findServiceById(service_id)
        if(serviceAlreadyExists.isLeft()) return Left.create(serviceAlreadyExists.error)
        if(!serviceAlreadyExists.value) return Left.create(new InvalidParamsError('Service not exists', 'SERVICE_NOT_EXISTS'))

        const hourAlreadyExists = await this.hoursRepo.findHoursById(hour_id)
        if(hourAlreadyExists.isLeft()) return Left.create(hourAlreadyExists.error)
        if(!hourAlreadyExists.value) return Left.create(new InvalidParamsError('Hour not exists', 'HOUR_NOT_EXISTS'))

        const specificScheduleAlreadyExists = await this.scheduleRepo.findSpecificSchedule( service_id , date , hour_id )
        if(specificScheduleAlreadyExists.isLeft()) return Left.create(specificScheduleAlreadyExists.error)
        if(specificScheduleAlreadyExists.value) return Left.create(new InvalidParamsError('Schedule already exists' , 'SCHEDULE_ALREADY_EXISTS'))

        const userScheduleAlreadyExists = await this.scheduleRepo.findUserScheduleInDate(date , user_id)
        if(userScheduleAlreadyExists.isLeft()) return Left.create(userScheduleAlreadyExists.error)
        if(userScheduleAlreadyExists.value) return Left.create(new InvalidParamsError('User schedule already exists for date' , 'SCHEDULE_ALREADY_EXISTS'))

    
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