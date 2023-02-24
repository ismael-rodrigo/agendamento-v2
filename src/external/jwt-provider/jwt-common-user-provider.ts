import { IJwtProvider } from './../../domain/_ports/providers/jwt/jwt-provider.interface';
import { JwtProvider } from "./jwt-provider";


export class JwtCommonUserProvider extends JwtProvider implements IJwtProvider {
    constructor(){
        super('access-secret-common-user' , 'refresh-secret-common-user')
    }
}

