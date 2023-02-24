import { PasswordEncryptProvider } from './../../external/password-encrypt-provider/password-encrypt';
import { CreateCommonUserController } from './../../domain/schedule/http/create-common-user-controller';
import { prisma } from '@external/prisma-client/client';
import { RegisterCommonUser } from '@domain/schedule/use-case/create-common-user/create-common-user';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';


export const makeRegisterCommonUserController = (): CreateCommonUserController=>{
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const passwordHasher = new PasswordEncryptProvider()
    const registerCommonUser = new RegisterCommonUser(commonUserRepo,passwordHasher)
    return new CreateCommonUserController(registerCommonUser)
}