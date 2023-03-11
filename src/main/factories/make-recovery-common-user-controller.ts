import { EmailServiceSESImplementation } from './../../external/email-service/aws-ses-implementation';
import { RecoveryCommonUserUseCase } from './../../domain/auth/use-case/recovery-credentials-common-user/recovery-credentials-common-user';
import { RecoveryCommonUserController } from './../../domain/auth/http/recovery-common-user-controller';
import { prisma } from '@external/prisma-client/client';
import { CommomUserPrismaRepository } from '@external/repository/common-user/common-user-repository-prisma';
import { JwtCommonUserProvider } from '@external/jwt-provider/jwt-common-user-provider';

export const makeRecoveryCommonUserController = (): RecoveryCommonUserController=>{
    const commonUserRepo = new CommomUserPrismaRepository(prisma)
    const loginCommonUser = new RecoveryCommonUserUseCase(commonUserRepo , new EmailServiceSESImplementation() , new JwtCommonUserProvider())
    return new RecoveryCommonUserController(loginCommonUser)
}