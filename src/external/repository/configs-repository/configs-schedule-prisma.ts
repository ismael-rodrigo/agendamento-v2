import { IntervalDateAvailableData } from '@domain/_entities/intervalAvailable/interval-data';
import { Left, Right } from '@shared/errors-handler/either';
import { PrismaClient } from '@prisma/client';
import { DateDisabled } from '@domain/_entities/date-disabled/date-disabled';
import { DateDisabledData } from '@domain/_entities/date-disabled/date-disabled-data';
import { DayDisabled } from '@domain/_entities/day-disabled/day-disabled';
import { DayDisabledData } from '@domain/_entities/day-disabled/day-disabled-data';
import { Either } from '@shared/errors-handler/either';
import { DbGenericError } from '@shared/errors-handler/errors/db-generic-error';
import { IConfigsSchedulesRepository } from '@domain/_ports/repository/configs-schedules-repository.interface';

export class ConfigSchedulePrismaRepository implements IConfigsSchedulesRepository {

    constructor (private prisma:PrismaClient){}

    async findIntervalAvailable(service_id:string) : Promise <Either< DbGenericError, IntervalDateAvailableData | null>> {
        try{
            const result = await this.prisma.intervalDateAvailable.findUnique({
                where:{
                    service_id:service_id
                }
            })
            return Right.create(result)
        }
        catch (err ){
            return Left.create( new DbGenericError('findCurrentIntervalSchedulesAvailable'))
        }

    }



    async addDayDisabled(day: DayDisabled): Promise<Either<DbGenericError, DayDisabledData>> {
        throw new Error('Method not implemented.');
    }
    async addDateDisabled(date: DateDisabled): Promise<Either<DbGenericError, DateDisabledData >> {
        throw new Error('Method not implemented.');
    }

    async findDayDisabled(day: number, service_id: string): Promise<Either<DbGenericError, DayDisabledData | null>> {
        try {
            const result = await this.prisma.dayDisabled.findFirst({
                where:{
                    day: day , 
                    service_id: service_id
                }
                
            })
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('ConfigSchedulePrismaRepository.findDayDisabled'))
        }
    }
    async findDateDisabled(date: Date, service_id: string): Promise<Either<DbGenericError, DateDisabledData | null>> {
        try {
            const result = await this.prisma.dateDisabled.findFirst({
                where:{
                    date: date , 
                    service_id: service_id
                }
                
            })
            return Right.create(result)
        }
        catch (err ){
            return Left.create(new DbGenericError('ConfigSchedulePrismaRepository.findDateDisabled'))
        }
    }
    

}