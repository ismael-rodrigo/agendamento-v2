import { LoginCommonUser } from './../use-case/login-common-user/login-common-user';
import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';


export class LoginCommonUserController implements Controller {
    constructor(private readonly loginCommonUser:LoginCommonUser ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.loginCommonUser.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}