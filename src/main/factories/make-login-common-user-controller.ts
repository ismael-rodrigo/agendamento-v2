import { JwtCommonUserProvider } from './../../external/jwt-provider/jwt-common-user-provider';
import { LoginCommonUserController } from './../../domain/auth/http/login-common-user-controller';
import { LoginCommonUser } from './../../domain/auth/use-case/login-common-user/login-common-user';
import { PasswordEncryptProvider } from './../../external/password-encrypt-provider/password-encrypt';
import { CreateCommonUserController } from './../../domain/schedule/http/create-common-user-controller';
import { prisma } from '@external/prisma-client/client';
import { RegisterCommonUser } from '@domain/schedule/use-case/create-common-user/create-common-user';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';


export const makeLoginCommonUserController = (): LoginCommonUserController=>{
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const passwordHasher = new PasswordEncryptProvider()
    const jwtProvider = new JwtCommonUserProvider()
    const loginCommonUser = new LoginCommonUser(passwordHasher,commonUserRepo,jwtProvider)
    return new LoginCommonUserController(loginCommonUser)
}