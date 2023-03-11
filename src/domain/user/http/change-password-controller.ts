import { ChangePasswordCommonUserUseCase } from './../use-case/change-password/change-password-common-user';
import { HttpRequest } from '../../_ports/controllers/http';
import { Controller } from '../../_ports/controllers/controller';
import { badRequest, ok } from '../../_ports/controllers/helper';


export class ChangePasswordCommonUserController implements Controller {
    constructor(private readonly useCase:ChangePasswordCommonUserUseCase ){}

    async handle(httpRequest:HttpRequest){
        const params = httpRequest.body
        const user_id = httpRequest.consumer_id
        const result = await this.useCase.execute({
            user_id:user_id,
            password:params.password,
            confirm:params.confirm
        });
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value);
    }
}