export interface CommomUserData {
    id :string
    cpf :string 
    password:string
    name :string 
    email: string
    phone_number :string 
    date_birth :Date 
    created_at: Date
    updated_at: Date
}

export interface CreateCommomUser {
    cpf :string 
    name :string 
    email: string
    password: string
    phone_number :string 
    date_birth :Date 
}