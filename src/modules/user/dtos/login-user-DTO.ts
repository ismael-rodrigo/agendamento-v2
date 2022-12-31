export namespace LoginUserDTO {
    export type params = {
        username:string
        password:string
    }
    export type returned = {
        access:string
        refresh:string
    }
}