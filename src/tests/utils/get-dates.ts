import {setYear , parseISO} from 'date-fns'

export function getFutureDate (date:string): Date {
    return setYear( parseISO(date), new Date().getFullYear()+ 1 )

}

export function getOldDate(years_befored:number): Date {
    return setYear( new Date(), new Date().getFullYear() - years_befored )
}