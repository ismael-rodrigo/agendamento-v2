export namespace LoginUserDTO {
    export type params = {
        username:string
        password:string
    }
    export type returned = {
        token:{
            access:string
            refresh:string
        }
    }
}