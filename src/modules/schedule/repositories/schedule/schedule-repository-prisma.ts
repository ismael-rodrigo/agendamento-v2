import { HourAvailable, IntervalDateAvailable, PrismaClient } from "@prisma/client";
import { Schedule } from "../../../../entities/schedule/schedule";
import { CreateScheduleData, ScheduleData } from "../../../../entities/schedule/schedule-data";
import { AppError } from "../../../../errors-handler/app-error";
import { Either, Left, Right } from "../../../../errors-handler/either";
import { VerifyHoursAvailableDTO } from "../../use-cases/find-hours-availabe/find-hours-available-DTO";
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

    async findHoursAvailableOfService( { date_consulted , service_id }: VerifyHoursAvailableDTO.request ): Promise <HourAvailable[]> {
        const result = await this.client.hourAvailable.findMany({
            where:{
                service_id: service_id,
        
                schedules:{
                    none:{
                        date: date_consulted
                    },
                },
                service:{
                
                    date_disabled:{
                        none:{
                            date: date_consulted
                    }},
                    days_disabled: {
                        none: {
                            day: new Date(date_consulted).getDay()
                        }
                    },
                    interval_available:{
                        intial_date: {
                            lte: date_consulted
                        },
                        final_date: {
                            gte: date_consulted
                        }
                    }
                }
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

    async findAllHoursAvailableByServiceId(service_id: string, date_consulted: Date){
        const result = await this.client.hourAvailable.findMany({
            where:{
                service_id,   
                service:{
                
                    date_disabled:{
                        none:{
                            date: date_consulted
                    }},
                    days_disabled: {
                        none: {
                            day: new Date(date_consulted).getDay()
                        }
                    },
                    interval_available:{
                        intial_date: {
                            lte: date_consulted
                        },
                        final_date: {
                            gte: date_consulted
                        }
                    }
                }
            }
        })
        return result
    }

    async createSchedule({date , hour_id , service_id , user_id , id}: Schedule): Promise< Either< AppError , ScheduleData>> {
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
            return Left.create(new AppError('Prisma generic error', 'DB_GENERIC_ERROR'))
        }
    }
}