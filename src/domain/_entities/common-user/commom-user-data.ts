export interface CommonUserData {
    id :string
    cpf :string 
    password:string
    name :string 
    email: string
    phone_number :string 
    created_at?: Date
    updated_at?: Date
}

export interface CommonUserResponse {
    id :string
    cpf :string 
    name :string 
    email: string
    phone_number :string 
    created_at?: Date
    updated_at?: Date
}


export interface CreateCommonUser {
    cpf :string 
    name :string 
    email: string
    password: string
    phone_number :string 
}