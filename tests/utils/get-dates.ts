import {setYear , parseISO} from 'date-fns'



export function getFutureDate (date:string): Date {
    const dateResult = setYear( parseISO(date), new Date().getFullYear() + 1 )

    return dateResult

}

export function getOldDate(years_befored:number): Date {
    const dateResult =  setYear( new Date(), new Date().getFullYear() - years_befored )


    return dateResult
}
