import { User } from "@prisma/client";
import { CredentialsInvalidError } from "../../../../errors-handler/errors/credentials-invalid-error";
import { Either } from "../../../../errors-handler/either";
import { AuthenticationError } from "../../../../errors-handler/errors/authentication-error";


export type CheckIfUserIsAdminResponse = Either < CredentialsInvalidError | AuthenticationError, User >