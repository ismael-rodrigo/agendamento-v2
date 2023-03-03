export interface CreateLocationData {
    id?:string
    address:string
    name:string
}

export interface LocationData {
    id:string
    address:string
    name:string
    created_at?: Date
    updated_at?: Date
}