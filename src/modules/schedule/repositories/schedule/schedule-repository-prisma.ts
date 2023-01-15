import { HourAvailable, IntervalDateAvailable, PrismaClient } from "@prisma/client";
import { Schedule } from "../../../../entities/schedule/schedule";
import { CreateScheduleData, ScheduleData } from "../../../../entities/schedule/schedule-data";
import { AppError } from "../../../../errors-handler/app-error";
import { Either, Left, Right } from "../../../../errors-handler/either";
import { VerifyHoursAvailableDTO } from "../../use-cases/find-hours-availabe/find-hours-available-DTO";
import { DbGenericError } from "../../../../errors-handler/errors/db-generic-error";
import { IScheduleRepository } from "./schedule-repository.interface";


export class ScheduleRepositoryPrisma implements IScheduleRepository {
    constructor(private client:PrismaClient){}
    
    async findCurrentIntervalSchedulesAvailable(service_id:string) : Promise <IntervalDateAvailable | null> {
        const result = await this.client.intervalDateAvailable.findUnique({
            where:{
                service_id:service_id
            }
        })
        return result
    }

    async findSchedulesByDateAndServiceId(service_id: string , date_consulted: Date){
        const result = await this.client.schedule.findMany({
            where:{
                service_id:service_id,
                date: date_consulted
            }
        })
        return result
    }


    async createSchedule({date , hour_id , service_id , user_id , id}: Schedule): Promise< Either< DbGenericError , ScheduleData>> {
        try{
            const userCreated = await this.client.schedule.create({
                data:{
                    date,
                    id:id.value,
                    hour_id,
                    user_id,
                    service_id
                }
            })
            return Right.create(userCreated)
        }
        catch (err) {
            return Left.create(new DbGenericError('createSchedule'))
        }
    }

    async findUserScheduleInDate(date_consulted: Date , user_id:string):Promise <Either<DbGenericError ,ScheduleData | null>> {
        try{
            const schedule = await this.client.schedule.findFirst({
                where:{
                    date:date_consulted,
                    user_id:user_id
                }
            })
            return Right.create(schedule)
        }
        catch (err ){
            return Left.create(new DbGenericError('findUserScheduleInDate'))
        }
    }

    async findSpecificSchedule(service_id: string, date_consulted: Date, hour_id: string): Promise<Either<DbGenericError, ScheduleData | null>> {
        try{
            const schedule = await this.client.schedule.findUnique({
                where:{
                    service_id_date_hour_id:{
                        service_id:service_id,
                        date:date_consulted,
                        hour_id:hour_id
                    }
                }
            })

            return Right.create(schedule)
        }
        catch (err ){
            return Left.create(new DbGenericError('findSpecificSchedule'))
        }

    }
}