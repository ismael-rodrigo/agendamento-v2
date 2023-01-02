import jwt, { Secret, JwtPayload  , JsonWebTokenError} from 'jsonwebtoken';
import { AppError } from '../../errors/appError';
import { CreateTokensReturned } from './jtw-provider.types';
import { IJwtProvider } from './jwt-provider.interface';

export class JwtProvider implements IJwtProvider {
    private readonly ACCESS_SECRET_KEY: Secret
    private readonly REFRESH_SECRET_KEY: Secret
    private readonly ACCESS_EXPIRES: string | number | undefined
    private readonly REFRESH_EXPIRES: string | number | undefined
    constructor(){
        this.ACCESS_SECRET_KEY = "access-secret-key"
        this.REFRESH_SECRET_KEY = "refresh-secret-key";
        this.ACCESS_EXPIRES= 60
        this.REFRESH_EXPIRES= 30
    }

    createTokens(payload:string): CreateTokensReturned{
        const accessToken = jwt.sign({ sub:payload } , this.ACCESS_SECRET_KEY , { expiresIn:this.ACCESS_EXPIRES } );
        const refreshToken = jwt.sign({ sub:payload } , this.REFRESH_SECRET_KEY , { expiresIn:this.REFRESH_EXPIRES } );
        
        return {
            access:accessToken,
            refresh:refreshToken
        };
    }
    

    verifyToken(token:string) : JwtPayload {
        try{
            const result = jwt.verify(token ,this.ACCESS_SECRET_KEY );
            return result as JwtPayload
        }
        catch (JsonWebTokenError) {
            throw new AppError(JsonWebTokenError?JsonWebTokenError:"Erro jwt not defined !" , "JWT_ERROR");
        }
    }

    createAccessToken(payload: string ) : string {
        const accessToken = jwt.sign( { sub:payload } , this.ACCESS_SECRET_KEY , {expiresIn:this.ACCESS_EXPIRES} );
        return accessToken
    }





}