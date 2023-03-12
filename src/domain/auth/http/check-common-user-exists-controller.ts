import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';
import { RegisterCommonUser } from '../../user/use-case/create-common-user/create-common-user';
import CheckCommonUserAlreadyExists from '../use-case/check-user-already-exists/check-common-user-already-exists';


export class CheckCommonUserExistsController implements Controller {
    constructor(private readonly checkCommonUser:CheckCommonUserAlreadyExists ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.query
        const result = await this.checkCommonUser.execute({
            cpf:params.cpf
        });

        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}