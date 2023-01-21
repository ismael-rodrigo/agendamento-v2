import { AppError } from "../app-error";
import {JsonWebTokenError} from 'jsonwebtoken';

export class JwtError extends AppError {
    constructor(err?:JsonWebTokenError){
        super( err?err.message:"Erro JWT not defiened" , "JWT_ERROR")
    }
}