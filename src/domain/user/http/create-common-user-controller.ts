import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';
import { RegisterCommonUser } from '../use-case/create-common-user/create-common-user';


export class CreateCommonUserController implements Controller {
    constructor(private readonly createCommonUser:RegisterCommonUser ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.createCommonUser.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}