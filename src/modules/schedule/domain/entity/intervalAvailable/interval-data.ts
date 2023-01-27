export interface CreateIntervalDateAvailable {
    id?: string
    intial_date: Date
    final_date: Date
    service_id: string
}

export interface IntervalDateAvailableData {
    id: string
    intial_date: Date
    final_date: Date
    service_id: string
    created_at?: Date
    updated_at?: Date
}