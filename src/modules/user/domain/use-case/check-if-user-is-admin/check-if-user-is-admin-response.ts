import { User } from "@prisma/client";
import { Either } from "../../../../../errors-handler/either";
import { AuthenticationError } from "../../../../../errors-handler/errors/authentication-error";
import { CredentialsInvalidError } from "../../../../../errors-handler/errors/credentials-invalid-error";


export type CheckIfUserIsAdminResponse = Either < CredentialsInvalidError | AuthenticationError, User >