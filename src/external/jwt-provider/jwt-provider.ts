import jwt, { Secret, JwtPayload  , JsonWebTokenError} from 'jsonwebtoken';
import { Either, Left, Right } from '../../shared/errors-handler/either';
import { JwtError } from '../../shared/errors-handler/errors/jwt-error';
import { InvalidPayloadError } from '@domain/_ports/providers/jwt/errors/invalid-payload-error';
import { CreateTokensReturned } from '@domain/_ports/providers/jwt/jtw-provider.types';
import { IJwtProvider } from '@domain/_ports/providers/jwt/jwt-provider.interface';


export class JwtProvider implements IJwtProvider {
    private readonly ACCESS_SECRET_KEY: Secret
    private readonly REFRESH_SECRET_KEY: Secret
    private readonly ACCESS_EXPIRES: string | number | undefined
    private readonly REFRESH_EXPIRES: string | number | undefined
    constructor(ACCESS_SECRET_KEY:string , REFRESH_SECRET_KEY:string ){
        this.ACCESS_SECRET_KEY = ACCESS_SECRET_KEY
        this.REFRESH_SECRET_KEY = REFRESH_SECRET_KEY
        this.ACCESS_EXPIRES= 5000
        this.REFRESH_EXPIRES= 5000
    }

    createTokens(payload:string): CreateTokensReturned{
        const accessToken = jwt.sign({ sub:payload } , this.ACCESS_SECRET_KEY , { expiresIn:this.ACCESS_EXPIRES } );
        const refreshToken = jwt.sign({ sub:payload } , this.REFRESH_SECRET_KEY , { expiresIn:this.REFRESH_EXPIRES } );
        
        return {
            access:accessToken,
            refresh:refreshToken
        };
    }
    

    verifyToken(token:string) : Either< JwtError, JwtPayload> {
        try{
            const result = jwt.verify(token ,this.ACCESS_SECRET_KEY );
            return Right.create(result as JwtPayload)
        }
        catch (err) {
            const error = err as JsonWebTokenError 
            return Left.create( new JwtError(error))
        }
    }

    createAccessToken(payload: string ) : Either< InvalidPayloadError, string> {
        if(!payload) return Left.create(new InvalidPayloadError)
        const accessToken = jwt.sign( { sub:payload } , this.ACCESS_SECRET_KEY , {expiresIn:this.ACCESS_EXPIRES} );
        return Right.create(accessToken)
    }
}