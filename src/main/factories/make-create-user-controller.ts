import { CreateUserController } from "@domain/admin/http/create-user-controller"
import { CreateUserUseCase } from "@domain/admin/use-case/create-user/create-user"
import { PasswordEncryptProvider } from "@external/password-encrypt-provider/password-encrypt"

import { prisma } from "@external/prisma-client/client"
import { UserRepositoryPrisma } from "@external/repository/user-repository-prisma"




export const makeCreateUserController = (): CreateUserController =>{
    const userRepository = new UserRepositoryPrisma(prisma)
    const passwordHashProvider = new PasswordEncryptProvider()
    const createUserUseCase = new CreateUserUseCase(userRepository , passwordHashProvider)
    return new CreateUserController(createUserUseCase)
}