import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export class JwtProvider {
    private readonly SECRET_KEY:Secret
    constructor(){
        this.SECRET_KEY = "secret-key";
    }
    createToken(payload:object , expires:string = "1h"){
        const token = jwt.sign(payload , this.SECRET_KEY , { expiresIn: expires });
        return token;
    }
    verifyToken(token:string) : string | JwtPayload {
        const result = jwt.verify(token ,this.SECRET_KEY );
        return result
    }

}