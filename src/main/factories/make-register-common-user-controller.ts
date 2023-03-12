import { JwtCommonUserProvider } from './../../external/jwt-provider/jwt-common-user-provider';
import { PasswordEncryptProvider } from './../../external/password-encrypt-provider/password-encrypt';
import { prisma } from '@external/prisma-client/client';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { RegisterCommonUser } from '@domain/user/use-case/create-common-user/create-common-user';
import { CreateCommonUserController } from '@domain/user/http/create-common-user-controller';


export const makeRegisterCommonUserController = (): CreateCommonUserController=>{
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const passwordHasher = new PasswordEncryptProvider()
    const jwtprovider = new JwtCommonUserProvider()
    const registerCommonUser = new RegisterCommonUser(commonUserRepo,passwordHasher,jwtprovider)
    return new CreateCommonUserController(registerCommonUser)
}