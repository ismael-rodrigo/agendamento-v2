import {container} from "tsyringe"
import { IUserRepository } from "../../modules/user/repositories/user-repository.interface"
import { UserRepository } from "../../modules/user/repositories/user-repository"
import { JwtProvider } from "../../utils/jwt-provider/jwt-provider"
import { IJwtProvider } from "../../utils/jwt-provider/jwt-provider.interface"
import { IPasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt.interface"
import { PasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt"
import { prisma } from "../../prisma-client/client"


container.register<IUserRepository>("UserRepository" , { useValue: new UserRepository(prisma) } );
container.registerSingleton<IJwtProvider>("JwtProvider" , JwtProvider);
container.registerSingleton<IPasswordEncryptProvider>("PasswordEncryptProvider" , PasswordEncryptProvider);