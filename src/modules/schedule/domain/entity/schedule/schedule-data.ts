export interface ScheduleData {
    id :string
    user_id :string
    service_id :string
    hour_id :string
    date :Date
    created_at :Date
    updated_at :Date
}

export interface CreateScheduleData {
    user_id :string
    service_id :string
    hour_id :string
    date :Date
}

