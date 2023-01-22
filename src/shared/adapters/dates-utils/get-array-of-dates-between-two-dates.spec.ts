import { describe, expect, it } from "vitest";
import { getFutureDate } from "../../../../tests/utils/get-dates";
import { AppError } from "../../errors-handler/errors/app-error";


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

        expect(arrayDates.isLeft()).toEqual(false)
        if(arrayDates.isLeft()) return

        expect(arrayDates.value).toBeTruthy()
        expect(arrayDates.value.length).toEqual(5)    
        
        arrayDates.value.forEach((date, index) => {
            expect(date).toEqual(array_expected[index])
        })

    })

    
    it('should not be able to create array with start date greater than end date', ()=>{

        const initialDate = getFutureDate('2022-01-05')
        const fiveDayBeforeInitialDate = getFutureDate('2022-01-01')

        const arrayDates = getDaysArray( initialDate , fiveDayBeforeInitialDate)

        expect(arrayDates.isLeft()).toEqual(true)
        if(arrayDates.isRight()) return

        expect(arrayDates.error).toBeInstanceOf(AppError)

    })

}) 