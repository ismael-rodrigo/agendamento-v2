import { describe, expect, it } from "vitest";
import { JwtProvider } from "./jwt-provider";

describe('create jwt provider', ()=>{
    const sut = new JwtProvider('secret-key', 'refresh-key')
    const payload = 'payload-tested'

    it('verify instace of jwt provider' , ()=>{
        expect(sut).instanceOf(JwtProvider)  
    })

    it('a token should not be generated if not provided' , ()=>{
        const access_token = sut.createAccessToken("")
        expect(access_token.isLeft()).toEqual(true)
    })

    it('a token should generated if provided' , ()=>{
        const access_token = sut.createAccessToken(payload)
        expect(access_token.isRight()).toEqual(true)
        if(!access_token.isRight()) return
        expect(access_token).toBeTruthy()
        expect(access_token).toString()
    })

    it('a token should generated decripted must have sub attribute and its value must be equal to the payload ' , ()=>{
        const access_token = sut.createAccessToken(payload)
        expect(access_token.isLeft()).toEqual(false)
        if(access_token.isLeft()) return

        const token_decriptyOrError = sut.verifyToken(access_token.value)
        expect(token_decriptyOrError.isLeft()).toEqual(false)

        if(token_decriptyOrError.isLeft()) return
        expect(token_decriptyOrError.value.sub).toBeTruthy()
        expect(token_decriptyOrError.value.sub).toEqual(payload)

    })




})