
import { expect , test } from "vitest";
import { getFutureDate, getOldDate } from "./get-dates";

test('increases date with one year' , ()=>{
    const yearNow = new Date().getFullYear()
    expect(getFutureDate(`${yearNow}-01-08`).getFullYear()).toEqual(yearNow + 1)
})

test('to decrease date with setted year' , ()=>{ 
    const yearsDecreased = 10 
    expect(getOldDate(yearsDecreased).getFullYear()).toEqual(new Date().getFullYear() - yearsDecreased)
})
