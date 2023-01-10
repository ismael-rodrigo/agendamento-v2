import { beforeEach, describe, expect, it, vitest } from "vitest";
import { Uuid } from "./uuid";

describe('UUID Provider', ()=>{

    describe('create instace of UUID Provider',()=>{
        it('object must to be instace of Uuid class' , ()=>{
            const sut = Uuid.create()
            expect(sut).toBeInstanceOf(Uuid)
        })
    })

    describe('check if Uuid returned is valid', ()=>{
        let sut:Uuid
        beforeEach(()=>{
            sut = Uuid.create()
        })

        it('value of the Uuid class must is not null value', ()=>{
            expect(sut.value).toBeTruthy()
            expect(sut.value).toString()
        })

        it('value of the Uuid class must is uuid valid',()=>{
            const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
            expect(regexExp.test(sut.value)).toEqual(true)
        })

    })
})