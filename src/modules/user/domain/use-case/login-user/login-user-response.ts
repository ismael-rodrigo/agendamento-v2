import { Either } from "../../../../../errors-handler/either";
import { CredentialsInvalidError } from "../../../../../errors-handler/errors/credentials-invalid-error";
import { LoginUserDTO } from "../../../http/rest/dtos/login-user-DTO";

export type LoginUserResponse = Either< CredentialsInvalidError , LoginUserDTO.returned >