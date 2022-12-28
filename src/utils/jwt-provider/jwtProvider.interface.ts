import { JwtPayload } from "jsonwebtoken"
import { CreateTokensReturned } from "./jtwProvider.types"

export interface IJwtProvider{
    createTokens(payload:object | string , expires?:string): CreateTokensReturned
    verifyToken(token:string): string | JwtPayload
}
