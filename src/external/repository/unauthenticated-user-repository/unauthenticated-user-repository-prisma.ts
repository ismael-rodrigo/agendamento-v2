import { UpdateCommonUser } from '@domain/_entities/common-user/commom-user-data';
import { CommomUser } from '@domain/_entities/common-user/common-user';
import { UnauthenticatedUserData } from '@domain/_entities/unauthenticated-user/unauthenticated-user-data';
import { PrismaClient } from '@prisma/client';
import { Either, Left, Right } from '@shared/errors-handler/either';
import { DbGenericError } from '@shared/errors-handler/errors/db-generic-error';
import { InvalidParamsError } from '@shared/errors-handler/errors/invalid-params-error';
import { IUnauthenticatedUserRepository } from './../../../domain/_ports/repository/unauthenticated-user.interface';




export class UnauthenticatedUserRepositoryPrisma implements IUnauthenticatedUserRepository {
    constructor(private client: PrismaClient){}

    findUserByCPF(cpf: string): Promise<Either<DbGenericError, UnauthenticatedUserData | null>> {
        throw new Error('Method not implemented.');
    }
    findUserById(user_id: string): Promise<Either<DbGenericError, UnauthenticatedUserData | null>> {
        throw new Error('Method not implemented.');
    }
    create(params: CommomUser): Promise<Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData>> {
        throw new Error('Method not implemented.');
    }
    update(user_id: string, updates: UpdateCommonUser): Promise<Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData>> {
        throw new Error('Method not implemented.');
    }
    async upsert({cpf , id , name , phone_number}: UnauthenticatedUserData): Promise<Either<DbGenericError | InvalidParamsError, UnauthenticatedUserData>> {
        try{
            const user_created = await this.client.unauthenticatedUser.upsert({
                where:{
                    cpf: cpf
                },
                update: {
                    name,
                    phone_number
                  },
                create:{
                    cpf , id , name , phone_number
                }})
            return Right.create(user_created)
        }
        catch (err) {

            return Left.create(new DbGenericError('UnauthenticatedUserRepositoryPrisma.upsert'))
        }    }

}