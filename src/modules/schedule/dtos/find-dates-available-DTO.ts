export namespace FindDatesDTO {
    export type params = {
        service_id: string
    }

    export type returned = {
        date: Date
        is_available: boolean
    }
}