import { prisma } from '@external/prisma-client/client';
import CheckCommonUserAlreadyExists from '@domain/auth/use-case/check-user-already-exists/check-common-user-already-exists';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { CheckCommonUserExistsController } from '../../domain/auth/http/check-common-user-exists-controller';

export const MakeCheckCommonUserExists = ():CheckCommonUserExistsController => {
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const useCase = new CheckCommonUserAlreadyExists(commonUserRepo) 
    return new CheckCommonUserExistsController(useCase)
}