import { JwtProvider } from './../../shared/adapters/jwt-provider/jwt-provider';
import { PasswordEncryptProvider } from './../../shared/adapters/password-encrypt-provider/password-encrypt';
import { prisma } from './../../external/prisma-client/client';
import { UserRepositoryPrisma } from '../../external/repository/user-repository-prisma';
import { LoginUserUseCase } from './../../modules/user/domain/use-case/login-user/login-user';
import { LoginUserController } from './../../modules/user/http/rest/login-user-controller';
export const makeLoginUserController = ():LoginUserController  =>{

    const userRepository = new UserRepositoryPrisma(prisma)
    const passwordEncryptProvider = new PasswordEncryptProvider
    const jwtProvider = new JwtProvider
    const loginUserUseCase = new LoginUserUseCase( userRepository , passwordEncryptProvider, jwtProvider )

    return new LoginUserController(loginUserUseCase)
}