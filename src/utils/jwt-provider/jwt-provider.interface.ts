import { JwtPayload } from "jsonwebtoken"
import { CreateTokensReturned } from "./jtw-provider.types"

export interface IJwtProvider{
    createTokens(payload:string , expires?:string): CreateTokensReturned
    verifyToken(token:string): JwtPayload
    createAccessToken(payload: string ) : string
}
