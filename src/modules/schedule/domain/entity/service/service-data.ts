export interface CreateService {
    service_name:string
    id?:string
    location_id: string
}

export interface ServiceData {
    id:string
    service_name:string
    location_id: string
    created_at?: Date
    updated_at?: Date
}