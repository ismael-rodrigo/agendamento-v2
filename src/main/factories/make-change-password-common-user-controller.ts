import { PasswordEncryptProvider } from '@external/password-encrypt-provider/password-encrypt';
import { ChangePasswordCommonUserUseCase } from './../../domain/user/use-case/change-password/change-password-common-user';
import { prisma } from '@external/prisma-client/client';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { ChangePasswordCommonUserController } from '@domain/user/http/change-password-controller';

export const makeChangePasswordCommonUserController = ():ChangePasswordCommonUserController => {
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const useCase = new ChangePasswordCommonUserUseCase(commonUserRepo , new PasswordEncryptProvider())
    return new ChangePasswordCommonUserController(useCase)
}