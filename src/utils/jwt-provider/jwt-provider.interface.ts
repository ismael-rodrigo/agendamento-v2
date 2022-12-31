import { JwtPayload } from "jsonwebtoken"
import { CreateTokensReturned } from "./jtw-provider.types"

export interface IJwtProvider{
    createTokens(payload:object | string , expires?:string): CreateTokensReturned
    verifyToken(token:string): string | JwtPayload
    createAccessToken(payload: string | JwtPayload) : string
}
