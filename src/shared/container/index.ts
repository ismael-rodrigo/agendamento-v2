import {container} from "tsyringe"
import { IUserRepository } from "../../modules/user/repositories/user-repository.interface"
import { UserRepositoryPrisma } from "../../modules/user/repositories/user-repository"
import { JwtProvider } from "../../utils/jwt-provider/jwt-provider"
import { IJwtProvider } from "../../utils/jwt-provider/jwt-provider.interface"
import { IPasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt.interface"
import { PasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt"
import { prisma } from "../../prisma-client/client"
import { IObjectValidator } from "../../validations/object-validator-yup.interface"
import { ObjectValidator } from "../../validations/object-validator-yup"






container.register<IUserRepository>("UserRepository" , { useValue: new UserRepositoryPrisma(prisma) } );
container.registerSingleton<IJwtProvider>("JwtProvider" , JwtProvider);
container.registerSingleton<IPasswordEncryptProvider>("PasswordEncryptProvider" , PasswordEncryptProvider);
container.registerSingleton<IObjectValidator>("ObjectValidator" , ObjectValidator)