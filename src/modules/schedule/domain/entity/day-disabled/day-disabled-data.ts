export interface DayDisabledData {
    id:string
    day:number,
    service_id:string,
    created_at?:Date
    updated_at?:Date
}

export interface CreateDayDisabled {
    id?:string
    day:number,
    service_id:string,
    created_at?:Date
    updated_at?:Date
}