import "reflect-metadata"
import "../shared/container"
import { container } from "tsyringe";
import { CreateUserUseCase } from "../modules/user/use-cases/create-user/create-user"

const exec = async () => {
    const username = (process.argv[2]);
    const password = (process.argv[3]);
    const createUserUseCase = container.resolve(CreateUserUseCase)
    const result = await createUserUseCase.execute({username , password});
}
exec()