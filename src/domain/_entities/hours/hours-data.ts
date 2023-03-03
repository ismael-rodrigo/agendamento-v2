export interface CreateHourAvailable {
    id?:string
    hour:number
    minutes: number 
    service_id: string
    enable?:boolean

    created_at?: Date
    updated_at?: Date
}

export interface HourAvailableData {
    id: string
    hour:number
    minutes: number 
    service_id: string
    enable:boolean
    created_at?: Date
    updated_at?: Date
}