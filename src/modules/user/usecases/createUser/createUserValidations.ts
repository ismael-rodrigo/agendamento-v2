import { AppError } from "../../../../errors/appError";
import { CreateUserDTO } from "../../dtos/createUserDTO";

export class CreateUserValidations {
    private readonly name:string;
    private readonly password:string;

    constructor({name , password} : CreateUserDTO.params ){
        this.name = name;
        this.password = password;
    }

    public is_valid(){
        this.length_name_is_valid();
        this.password_is_secure();
    }


    private length_name_is_valid(): void {
        if(this.name.length == 0 || this.name.length > 85){
            throw new AppError("Length of name not valid !" , "LENGTH_NAME_NOT_VALID");
        }
    }

    private password_is_secure(){
        //check if password is secure
    }




}