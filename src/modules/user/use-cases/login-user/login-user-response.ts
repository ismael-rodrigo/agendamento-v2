import { AuthenticationError } from "../../../../errors-handler/errors/authentication-error";
import { Either } from "../../../../errors-handler/either";
import { CredentialsInvalidError } from "../../../../errors-handler/errors/credentials-invalid-error";
import { LoginUserDTO } from "../../dtos/login-user-DTO";

export type LoginUserResponse = Either< CredentialsInvalidError , LoginUserDTO.returned >