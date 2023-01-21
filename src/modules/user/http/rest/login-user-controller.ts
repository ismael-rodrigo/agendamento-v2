import { Controller } from './../../../_ports/controllers/controller';
import { LoginUserUseCase } from "../../domain/use-case/login-user/login-user";
import { HttpRequest, HttpResponse } from "../../../_ports/controllers/http";
import { badRequest, ok } from "../../../_ports/controllers/helper";


export class LoginUserController implements Controller {
    constructor(
        private readonly loginUserUseCase:LoginUserUseCase
        ){}
        
    async handle(httpRequest:HttpRequest):Promise<HttpResponse> {
        const params = httpRequest.body
        const result = await this.loginUserUseCase.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        }
        return ok(result.value)
    }
}