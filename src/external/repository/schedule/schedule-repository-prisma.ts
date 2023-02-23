import { ScheduleData } from '@domain/_entities/schedule/schedule-data';
import { Schedule } from '@domain/_entities/schedule/schedule';
import { PrismaClient } from "@prisma/client";
import { IScheduleRepository } from "@domain/_ports/repository/schedule-repository.interface";
import { Either, Left, Right } from "@shared/errors-handler/either";
import { DbGenericError } from "@shared/errors-handler/errors/db-generic-error";




export class ScheduleRepositoryPrisma implements IScheduleRepository {
    constructor(private client:PrismaClient){}
    
    async findSchedulesByDateAndServiceId(service_id: string , date_consulted: Date){
        try{
            const result = await this.client.schedule.findMany({
                where:{
                    service_id:service_id,
                    date: date_consulted
                }
                })

            return Right.create(result)
        }
        catch( err){
            return Left.create(new DbGenericError('ScheduleRepositoryPrisma.findSchedulesByDateAndServiceId'))
        }
    }


    async createSchedule({date , hour_id , service_id , user_id , id}: Schedule ): Promise< Either< DbGenericError , ScheduleData>> {
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