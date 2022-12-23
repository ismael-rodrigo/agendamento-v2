export namespace VerifyTokenDTO {
    export type params = {
        type:'access'|'refresh'
        token:string
    }

    export type returned = {
        new_token:params
    }

}