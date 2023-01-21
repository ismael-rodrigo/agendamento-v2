import {container} from "tsyringe"
import { IUserRepository } from "../../modules/user/domain/port/user-repository.interface"
import { UserRepositoryPrisma } from "../../external/repository/user-repository-prisma"
import { JwtProvider } from "../../utils/jwt-provider/jwt-provider"
import { IJwtProvider } from "../../utils/jwt-provider/jwt-provider.interface"
import { IPasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt.interface"
import { PasswordEncryptProvider } from "../../utils/password-encrypt-provider/password-encrypt"
import { prisma } from "../../external/prisma-client/client"
import { IObjectValidator } from "../../validations/object-validator-yup.interface"
import { ObjectValidator } from "../../validations/object-validator-yup"
import { IScheduleRepository } from "../../modules/schedule/domain/port/repository/schedule-repository.interface"

import { IHoursRepository } from "../../modules/schedule/domain/port/repository/hours-repository.interface"
import { ICommonUserRepository } from "../../modules/schedule/domain/port/repository/common-user-repository.interface"
import { CommomUserPrismaRepository } from "../../modules/schedule/adapter/repository/common-user/common-user-repository-prisma"
import { IServiceRepository } from "../../modules/schedule/domain/port/repository/service-repository.interface"
import { ScheduleRepositoryPrisma } from "../../modules/schedule/adapter/repository/schedule/schedule-repository-prisma"
import { HoursPrismaRepository } from "../../modules/schedule/adapter/repository/hours/hours-repository-prisma"
import { ServicePrismaRepository } from "../../modules/schedule/adapter/repository/service/service-repository-prisma"






container.register<IScheduleRepository>("ScheduleRepository" , {useValue: new ScheduleRepositoryPrisma(prisma)} )
container.register<IUserRepository>("UserRepository" , { useValue: new UserRepositoryPrisma(prisma) } );
container.register<IHoursRepository>("HoursRepository" , { useValue: new HoursPrismaRepository(prisma) } );
container.register<ICommonUserRepository>("CommonUserRepository" , { useValue: new CommomUserPrismaRepository(prisma) } );
container.register<IServiceRepository>("ServiceRepository" , { useValue: new ServicePrismaRepository(prisma) } );




container.registerSingleton<IJwtProvider>("JwtProvider" , JwtProvider);
container.registerSingleton<IPasswordEncryptProvider>("PasswordEncryptProvider" , PasswordEncryptProvider);
container.registerSingleton<IObjectValidator>("ObjectValidator" , ObjectValidator)