import { CommonUserResponse } from "@domain/_entities/common-user/commom-user-data"
import { CreateTokensReturned } from "@domain/_ports/providers/jwt/jtw-provider.types"

export type LoginCommonUserRequest = {
    cpf:string
    password:string
}
export type LoginCommonUserResponse = {
    user: CommonUserResponse
    token: CreateTokensReturned
}
