import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { CreateTokensReturned } from './jtwProvider.types';
import { IJwtProvider } from './jwtProvider.interface';

export class JwtProvider implements IJwtProvider {
    private readonly SECRET_KEY: Secret
    private readonly ACCESS_EXPIRES: string | number | undefined
    private readonly REFRESH_EXPIRES: string | number | undefined
    constructor(){
        this.SECRET_KEY = "secret-key";
        this.ACCESS_EXPIRES= 30
        this.REFRESH_EXPIRES= 30
    }
    createTokens(payload:object): CreateTokensReturned{
        const accessToken = jwt.sign(payload , this.SECRET_KEY );
        const refreshToken = jwt.sign(payload , this.SECRET_KEY );
        return {
            access:accessToken,
            refresh:refreshToken
        };
    }
    

    verifyToken(token:string) : string | JwtPayload {
        const result = jwt.verify(token ,this.SECRET_KEY );
        return result
    }
    
}