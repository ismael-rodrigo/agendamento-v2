export interface CreateUserData {
    id?:string
    username :string
    password :string
    is_admin ?:boolean
}

export interface UserData {
    id  :string
    username :string
    password :string
    is_admin :boolean  
    created_at :Date
    updated_at :Date
}