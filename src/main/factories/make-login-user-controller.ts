// import { JwtProvider } from '@external/jwt-provider/jwt-provider';

// import { prisma } from '@external/prisma-client/client';
// import { UserRepositoryPrisma } from '@external/repository/user-repository-prisma';

// export const makeLoginUserController = (): LoginUserController  =>{

//     const userRepository = new UserRepositoryPrisma(prisma)
//     const passwordEncryptProvider = new PasswordEncryptProvider
//     const jwtProvider = new JwtProvider
//     const loginUserUseCase = new LoginUserUseCase( userRepository , passwordEncryptProvider, jwtProvider )

//     return new LoginUserController(loginUserUseCase)
// }