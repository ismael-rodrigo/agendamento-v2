export namespace LoginUserDTO {
    export type params = {
        name:string
        password:string
    }
    export type returned = {
        token:{
            access:string
            refresh:string
        }
    }
}