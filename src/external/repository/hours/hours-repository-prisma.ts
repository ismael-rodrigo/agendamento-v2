import { PrismaClient } from "@prisma/client";
import { HourAvailableData } from "../../../modules/schedule/domain/entity/hours/hours-data";
import { IHoursRepository } from "../../../modules/schedule/domain/port/repository/hours-repository.interface";
import { Either, Left, Right } from "../../../shared/errors-handler/either";
import { DbGenericError } from "../../../shared/errors-handler/errors/db-generic-error";


export class HoursPrismaRepository implements IHoursRepository {
    constructor(private client:PrismaClient){}
    async findHoursById(hours_id: string): Promise< Either < DbGenericError, HourAvailableData | null >> {
        try{
            const hour = await this.client.hourAvailable.findUnique({ where: { id : hours_id } })
            return Right.create(hour)
        }
        catch (err) {
            return Left.create(new DbGenericError('findHoursById'))
        }
    }

    async findHoursAvailableInDate(service_id: string, date_consulted: Date ): Promise <Either< DbGenericError , HourAvailableData[]>> {
        try{
            const result = await this.client.hourAvailable.findMany({
                where:{
                    is_active: true,
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
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('findHoursAvailableInDate'))
        }
    }


    async findAllHoursInDate(service_id: string, date_consulted: Date): Promise <Either <DbGenericError , HourAvailableData[]>>{
        try{
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
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('findAllHoursInDate'))
        }
    
    
    }
}