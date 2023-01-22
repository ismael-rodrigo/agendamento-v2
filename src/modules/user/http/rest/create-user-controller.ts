import { Controller } from './../../../_ports/controllers/controller';
import { badRequest } from './../../../_ports/controllers/helper';
import { CreateUserUseCase } from "../../domain/use-case/create-user/create-user";
import { HttpRequest, HttpResponse } from "../../../_ports/controllers/http";
import { ok } from '../../../_ports/controllers/helper';


export class CreateUserController implements Controller{
    constructor( 
        private readonly createUserUseCase: CreateUserUseCase   
        ){}

    async handle(httpRequest:HttpRequest): Promise <HttpResponse> {
        const params = httpRequest.body;
        const result = await this.createUserUseCase.execute(params);
        if(result.isLeft()){
            return badRequest(result.error)
        } 
        return ok(result.value)
    }
}