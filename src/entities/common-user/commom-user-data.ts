export interface CommomUserData {
    id :string
    cpf :string 
    name :string 
    phone_number :string 
    date_birth :Date 
    created_at: Date
    updated_at: Date
}

export interface CreateCommomUser {
    cpf :string 
    name :string 
    phone_number :string 
    date_birth :Date 
}