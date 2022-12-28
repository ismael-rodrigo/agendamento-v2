import {container} from "tsyringe"
import { IUserRepository } from "../../modules/user/repositories/IUserRepository"
import { UserRepository } from "../../modules/user/repositories/UserRepository"
import { JwtProvider } from "../../utils/jwt-provider/jwtProvider"
import { IJwtProvider } from "../../utils/jwt-provider/jwtProvider.interface"
import { IPasswordEncryptProvider } from "../../utils/password-encrypt-provider/IPasswordEncrypt"
import { PasswordEncryptProvider } from "../../utils/password-encrypt-provider/PasswordEncrypt"


container.registerSingleton<IUserRepository>("UserRepository" , UserRepository);
container.registerSingleton<IJwtProvider>("JwtProvider" , JwtProvider);
container.registerSingleton<IPasswordEncryptProvider>("PasswordEncryptProvider" , PasswordEncryptProvider);