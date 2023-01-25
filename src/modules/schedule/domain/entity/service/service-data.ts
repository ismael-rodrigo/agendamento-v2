export interface CreateService {
    service_name:string
    id?:string
}

export interface ServiceData {
    id:string
    service_name:string
    created_at?: Date
    updated_at?: Date
}