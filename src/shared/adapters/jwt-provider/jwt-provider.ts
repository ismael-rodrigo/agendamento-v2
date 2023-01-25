import jwt, { Secret, JwtPayload  , JsonWebTokenError} from 'jsonwebtoken';
import { Either, Left, Right } from '../../errors-handler/either';
import { JwtError } from '../../errors-handler/errors/jwt-error';
import { InvalidPayloadError } from '../../../modules/_ports/providers/jwt/errors/invalid-payload-error';
import { CreateTokensReturned } from '../../../modules/_ports/providers/jwt/jtw-provider.types';
import { IJwtProvider } from '../../../modules/_ports/providers/jwt/jwt-provider.interface';


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