export namespace CreateUserDTO {
    export type params = {
        name: string
        password: string
    }
    export type returned = {
        id: number
        name: string
    }

}