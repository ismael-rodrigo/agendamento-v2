import { JwtProvider } from '@external/jwt-provider/jwt-provider';
import { IEmailService } from '@domain/_ports/providers/email/email-service.interface';
import { InvalidParamsError } from '@shared/errors-handler/errors/invalid-params-error';
import { ICommonUserRepository } from '@domain/_ports/repository/common-user-repository.interface';
import { InvalidEmailError } from '../../../../shared/entities/errors/invalid-email-error';
import { Email } from '../../../../shared/entities/email';
import { InvalidCpfError } from '@shared/entities/errors/invalid-cpf-error';
import { Left, Right } from '@shared/errors-handler/either';
import { Cpf } from '@shared/entities/cpf';
import { RecoveryCommonUserRequest } from './recovery-credentials-common-user-DTO';
import { EmailRecoveryStructure } from './make-recovery-email';


export class RecoveryCommonUserUseCase {
    constructor(
        private readonly userRepo:ICommonUserRepository,
        private readonly emailService:IEmailService,
        private readonly jwtProvider:JwtProvider
        ){
    }

    async execute({cpf , email}:RecoveryCommonUserRequest){
        if(!Cpf.validate(cpf)){
            return Left.create(new InvalidCpfError(cpf))
        }
        if(!Email.validate(email)){
            return Left.create(new InvalidEmailError(email))
        }
        const userOrError = await this.userRepo.findUserByCPF(cpf)
        if(userOrError.isLeft()){
            return Left.create(userOrError.error)
        }
        if(!userOrError.value){
            return Left.create(new InvalidParamsError)
        }
        if(userOrError.value.email != email){
            return Left.create(new InvalidEmailError(email))
        }

        const tokenOrError = this.jwtProvider.createAccessToken(userOrError.value.id)
        if(tokenOrError.isLeft()) return Left.create(tokenOrError.error)

        await this.emailService.send(EmailRecoveryStructure.make(userOrError.value , `http://192.168.0.11:5173/redefinir-senha?token=${tokenOrError.value}`))
        return Right.create('ok')
    }

}