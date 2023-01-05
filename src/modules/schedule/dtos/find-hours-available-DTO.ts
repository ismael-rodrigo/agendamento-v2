import { HourAvailable } from "@prisma/client"



export namespace VerifyHoursAvailableDTO {
    export type params = {
        service_id: string
        date_consulted: Date
    }

    export type returned = {
        date: Date
        hours:HourAvailable[]
    }

}