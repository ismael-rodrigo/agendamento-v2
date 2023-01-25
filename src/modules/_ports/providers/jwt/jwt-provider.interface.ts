import { JwtPayload } from "jsonwebtoken"
import { Either } from "../../../../shared/errors-handler/either"
import { InvalidPayloadError } from "./errors/invalid-payload-error"
import { CreateTokensReturned } from "./jtw-provider.types"

export interface IJwtProvider{
    createTokens(payload:string , expires?:string): CreateTokensReturned
    verifyToken(token:string): JwtPayload
    createAccessToken(payload: string ) : Either< InvalidPayloadError, string>
}
