import { HourAvailable, IntervalDateAvailable, PrismaClient } from "@prisma/client";
import { VerifyHoursAvailableDTO } from "../use-cases/find-hours-availabe/find-hours-available-DTO";
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

    async findHoursAvailableOfService( { date_consulted , service_id }: VerifyHoursAvailableDTO.params ): Promise <HourAvailable[]> {
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
                service_id,
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




}