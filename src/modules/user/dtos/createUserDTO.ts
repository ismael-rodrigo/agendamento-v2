export namespace CreateUserDTO {
    export type params = {
        username: string
        password: string
    }
    export type returned = {
        id: number
        username: string
    }
}