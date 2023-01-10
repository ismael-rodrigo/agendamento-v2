import { describe, expect, it } from "vitest";
import { getFutureDate } from "../../tests/utils/get-dates";
import { getDaysArray } from "./get-array-of-dates-between-two-dates";

describe('Generator Array of dates with two dates',()=>{

    it('should be able to create array with two dates', ()=>{

        const initialDate = getFutureDate('2022-01-01')
        const fiveDayBeforeInitialDate = getFutureDate('2022-01-05')

        const array_expected = [
            getFutureDate('2022-01-01'),
            getFutureDate('2022-01-02'),
            getFutureDate('2022-01-03'),
            getFutureDate('2022-01-04'),
            getFutureDate('2022-01-05')
        ]

        const arrayDates = getDaysArray( initialDate , fiveDayBeforeInitialDate)


        expect(arrayDates).toBeTruthy()
        expect(arrayDates.length).toEqual(5)    
        
        arrayDates.forEach((date, index) => {
            expect(date).toEqual(array_expected[index])
        })

    })
    

}) 