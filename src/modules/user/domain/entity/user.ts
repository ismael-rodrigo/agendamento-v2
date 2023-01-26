import { Username } from './../../../../shared/entities/username';
import { Left, Either, Right } from './../../../../shared/errors-handler/either';
import { CreateUserData } from './user-data';
import { Password } from '../../../../shared/entities/password';
import { Uuid } from '../../../../shared/entities/uuid';
import { IPasswordEncryptProvider } from '../../../_ports/providers/password-encrypt/password-encrypt.interface';
import { InvalidPasswordError } from '../../../../shared/entities/errors/invalid-password-error';
import { InvalidNameError } from '../../../../shared/entities/errors/invalid-name-error';

interface UserConstructorParams {
    id  :Uuid
    username :Username
    password :Password
    is_admin :boolean
}

export class User {
    public readonly id:Uuid
    public readonly username:Username
    public readonly password:Password
    public readonly is_admin:boolean
    private constructor(private readonly passwordHasher:IPasswordEncryptProvider , { id , is_admin , password , username } : UserConstructorParams ){
        this.id = id
        this.username = username
        this.password = password
        this.is_admin = is_admin
    }
    static async create(passwordHasher:IPasswordEncryptProvider , { password , username , is_admin } : CreateUserData ):Promise<Either<InvalidPasswordError | InvalidNameError , User>>{
        const passwordOrError = await Password.createHashed(passwordHasher , password)
        if(passwordOrError.isLeft()){
            return Left.create(passwordOrError.error)
        }

        const uuid = Uuid.create()

        const usernameOrError = Username.create(username)
        if(usernameOrError.isLeft()) return Left.create(new InvalidNameError(username))
        return Right.create(new User(passwordHasher , { password:passwordOrError.value , id:uuid , is_admin:false , username:usernameOrError.value}))

        

    }

}