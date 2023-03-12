import { UnauthenticatedUser } from './../../../_entities/unauthenticated-user/unauthenticated-user';
import { IUnauthenticatedUserRepository } from './../../../_ports/repository/unauthenticated-user.interface';
import { AppError } from "@shared/errors-handler/errors/app-error";
import { Left, Right } from "@shared/errors-handler/either";
import { InvalidParamsError } from "@shared/errors-handler/errors/invalid-params-error";
import { Schedule } from "@domain/_entities/schedule/schedule";
import { IHoursRepository } from "@domain/_ports/repository/hours-repository.interface";
import { IScheduleRepository } from "@domain/_ports/repository/schedule-repository.interface";
import { IServiceRepository } from "@domain/_ports/repository/service-repository.interface";
import { CreateUnauthenticatedScheduleRequest, CreateUnauthenticatedScheduleResponse } from "./unauthenticated-scheduling-DTO";
import { IConfigsSchedulesRepository } from "@domain/_ports/repository/configs-schedules-repository.interface";


export class CreateUnauthenticatedSchedule {
    constructor(
        private readonly configsRepo:IConfigsSchedulesRepository ,
        private readonly scheduleRepo:IScheduleRepository , 
        private readonly serviceRepo:IServiceRepository ,
        private readonly hoursRepo:IHoursRepository , 
        private readonly unauthenticatedUserRepo: IUnauthenticatedUserRepository
        ){}

    async execute({ date , hour_id ,service_id , user  }: CreateUnauthenticatedScheduleRequest): Promise<CreateUnauthenticatedScheduleResponse> {

        const serviceAlreadyExists = await this.serviceRepo.findServiceById(service_id)
        if(serviceAlreadyExists.isLeft()) return Left.create(serviceAlreadyExists.error)
        if(!serviceAlreadyExists.value) return Left.create(new InvalidParamsError('Service not exists', 'SERVICE_NOT_EXISTS'))

        const intervalAvalilable = await this.configsRepo.findIntervalAvailable(service_id)
        if(intervalAvalilable.isLeft()) return Left.create(intervalAvalilable.error)
        if(!intervalAvalilable.value) return Left.create(new AppError('IntervalAvailable not found in service' , 'NOT_INTERVAL_IN_SERVICE'))

        const dayDisabledConflict = await this.configsRepo.findDayDisabled( new Date(date).getDay() , service_id )
        if(dayDisabledConflict.isLeft()) return Left.create(dayDisabledConflict.error)
        if(dayDisabledConflict.value) return Left.create(new InvalidParamsError('Day not available' , 'DAY_NOT_AVAILABLE'))

        const dateDisabledConflict = await this.configsRepo.findDateDisabled( new Date(date) , service_id )
        if(dateDisabledConflict.isLeft()) return Left.create(dateDisabledConflict.error)
        if(dateDisabledConflict.value) return Left.create(new InvalidParamsError('Date not available' , 'DATE_NOT_AVAILABLE'))

        const newUser = UnauthenticatedUser.create(user)
        if(newUser.isLeft()) return Left.create(newUser.error)

        const unauthenticatedUserAlreadyExists = await this.unauthenticatedUserRepo.upsert(newUser.value.value)

        if(unauthenticatedUserAlreadyExists.isLeft()) return Left.create(unauthenticatedUserAlreadyExists.error)
        const hourAlreadyExists = await this.hoursRepo.findHoursById(hour_id)
        if(hourAlreadyExists.isLeft()) return Left.create(hourAlreadyExists.error)
        if(!hourAlreadyExists.value) return Left.create(new InvalidParamsError('Hour not exists', 'HOUR_NOT_EXISTS'))

        const schedule = Schedule.create({
            date: new Date(date), 
            hour: hourAlreadyExists.value,
            service:serviceAlreadyExists.value,
            user_id: unauthenticatedUserAlreadyExists.value.id ,
            intervalAvailable:intervalAvalilable.value
        })

        if(schedule.isLeft()){
            return Left.create(schedule.error)
        }

        const specificScheduleAlreadyExists = await this.scheduleRepo.findSpecificSchedule( schedule.value.service_id , schedule.value.date , hour_id )
        if(specificScheduleAlreadyExists.isLeft()) return Left.create(specificScheduleAlreadyExists.error)
        if(specificScheduleAlreadyExists.value) return Left.create(new InvalidParamsError('Schedule already exists' , 'SCHEDULE_ALREADY_EXISTS'))

        const userScheduleAlreadyExists = await this.scheduleRepo.findUnauthenticatedUserScheduleInDate( schedule.value.date , schedule.value.user_id)
        if(userScheduleAlreadyExists.isLeft()) return Left.create(userScheduleAlreadyExists.error)
        if(userScheduleAlreadyExists.value) return Left.create(new InvalidParamsError('User schedule already exists for date' , 'USER_ALREADY_SCHEDULE_IN_DATE'))

        const result = await this.scheduleRepo.createSchedule(schedule.value , false)
        if(result.isLeft()){
            return Left.create(result.error)
        }

        return Right.create(result.value)
    }

}