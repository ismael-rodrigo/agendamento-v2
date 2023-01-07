import { Either } from "../../../../errors-handler/either";
import { InvalidParamsError } from "../../../../errors-handler/errors/invalid-params-error";
import { CreateUserDTO } from "../../dtos/create-user-DTO";


export type CreateUserResponse = Either < InvalidParamsError , CreateUserDTO.returned >