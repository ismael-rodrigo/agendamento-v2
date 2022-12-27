import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export class JwtProvider {
    private readonly SECRET_KEY:string
    constructor(){
        this.SECRET_KEY = "secret-key";
    }
    async createToken(payload:object){
        jwt.sign(payload , this.SECRET_KEY , {expiresIn:"1h"})

    }
    verifyToken(){

    }

}