import { UserData } from './../../../../user/domain/entity/user-data';

import { Either } from "../../../../../shared/errors-handler/either";
import { AuthenticationError } from "../../../../../shared/errors-handler/errors/authentication-error";
import { CredentialsInvalidError } from "../../../../../shared/errors-handler/errors/credentials-invalid-error";
import { User } from "../../../../user/domain/entity/user";



export type CheckIfUserIsAdminResponse = Either < CredentialsInvalidError | AuthenticationError, UserData >