import { RecoveryCommonUserUseCase } from '../use-case/recovery-credentials-common-user/recovery-credentials-common-user';
import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';


export class RecoveryCommonUserController implements Controller {
    constructor(private readonly recoveryCommonUser:RecoveryCommonUserUseCase ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const result = await this.recoveryCommonUser.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}