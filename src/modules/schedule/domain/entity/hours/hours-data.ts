export interface CreateHourAvailable {
    id?:string
    hour:number
    minutes: number 
    service_id: string

    created_at?: Date
    updated_at?: Date
}

export interface HourAvailableData {
    id: string
    hour:number
    minutes: number 
    service_id: string

    created_at?: Date
    updated_at?: Date
}