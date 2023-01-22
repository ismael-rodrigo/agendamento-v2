import { User } from "@prisma/client";
import { Either } from "../../../../../shared/errors-handler/either";
import { AuthenticationError } from "../../../../../shared/errors-handler/errors/authentication-error";
import { CredentialsInvalidError } from "../../../../../shared/errors-handler/errors/credentials-invalid-error";



export type CheckIfUserIsAdminResponse = Either < CredentialsInvalidError | AuthenticationError, User >