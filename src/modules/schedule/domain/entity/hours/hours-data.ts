export interface CreateHours {
    hour:number
    minutes: number 
    service_id: string
}

export interface HoursData {
    id: string
    hour:number
    minutes: number 
    service_id: string
    
    created_at: Date
    updated_at: Date
}