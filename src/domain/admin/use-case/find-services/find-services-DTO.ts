import { ServiceData } from '@domain/_entities/service/service-data';
export type FindServicesRequest = {
    service_id?:string
    location_id?:string
}

export type FindServicesResponse = ServiceData[]