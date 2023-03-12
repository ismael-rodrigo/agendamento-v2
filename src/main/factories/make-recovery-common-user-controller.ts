import { EmailServiceSESImplementation } from './../../external/email-service/aws-ses-implementation';
import { prisma } from '@external/prisma-client/client';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { JwtCommonUserProvider } from '@external/jwt-provider/jwt-common-user-provider';
import { RecoveryCommonUserController } from '@domain/user/http/recovery-common-user-controller';
import { RecoveryCommonUserUseCase } from '@domain/user/use-case/recovery-credentials-common-user/recovery-credentials-common-user';

export const makeRecoveryCommonUserController = (): RecoveryCommonUserController=>{
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const loginCommonUser = new RecoveryCommonUserUseCase(commonUserRepo , new EmailServiceSESImplementation() , new JwtCommonUserProvider())
    return new RecoveryCommonUserController(loginCommonUser)
}