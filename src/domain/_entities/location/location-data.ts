export interface CreateLocationData {
    id?:string
    address:string
    
}

export interface LocationData {
    id:string
    address:string
    created_at?: Date
    updated_at?: Date
}