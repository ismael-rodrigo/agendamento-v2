import { PrismaClient } from "@prisma/client";
import { HoursData } from "../../../../entities/hours/hours-data";
import { Either, Left, Right } from "../../../../errors-handler/either";
import { DbGenericError } from "../errors/db-generic-error";
import { IHoursRepository } from "./hours-repository.interface";

export class HoursPrismaRepository implements IHoursRepository {
    constructor(private client:PrismaClient){}
    async findHoursById(hours_id: string): Promise< Either < DbGenericError, HoursData | null >> {
        try{
            const hour = await this.client.hourAvailable.findUnique({ where: { id : hours_id } })
            return Right.create(hour)
        }
        catch (err) {
            return Left.create(new DbGenericError)
        }
    }
}