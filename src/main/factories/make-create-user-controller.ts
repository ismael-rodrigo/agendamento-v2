import { PasswordEncryptProvider } from './../../shared/adapters/password-encrypt-provider/password-encrypt';
import { prisma } from "../../external/prisma-client/client";
import { UserRepositoryPrisma } from "../../external/repository/user-repository-prisma";
import { CreateUserController } from "../../modules/user/http/rest/create-user-controller";
import { CreateUserUseCase } from '../../modules/user/domain/use-case/create-user/create-user';


export const makeCreateUserController = (): CreateUserController =>{
    const userRepository = new UserRepositoryPrisma(prisma)
    const passwordHashProvider = new PasswordEncryptProvider
    const createUserUseCase = new CreateUserUseCase(userRepository , passwordHashProvider)
    return new CreateUserController(createUserUseCase)
}