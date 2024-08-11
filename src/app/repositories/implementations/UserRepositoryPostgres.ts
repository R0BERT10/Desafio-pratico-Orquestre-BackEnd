import { AppDataSource } from "../../../database/data-source";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../IUsersRepository";

export default class UserRepositoryPostgres implements IUserRepository {
    private repository = AppDataSource.getRepository(User)
    private authProvider = "EpeNsy3hJrgNwsQbGQv37YBzTK73"
    
    async createNewUser(user: User): Promise<Result<User>> {
        if (await this.repository.findOneBy({ uid:user.uid})){
            return Result.fail(ClientError.CONFLICT("Uid already exists in the database",`UserPostgresRepository: createNewUser(${user})`))
        }
        if (await this.repository.findOneBy({ email:user.email })){
            return Result.fail(ClientError.CONFLICT("Email already registered",`UserPostgresRepository: createNewUser(${user})`))
        }
        if (await this.repository.findOneBy({ user:user.user })) {
            return Result.fail(ClientError.CONFLICT("Username already exists",`UserPostgresRepository: createNewUser(${user})`))
        }
        const newUser = this.repository.create(user)
        const result = await this.repository.save(newUser)
        return Result.ok(result)
    }
    async findByUid(uid: string): Promise<Result<User>> {
        const user = await this.repository.findOneBy({ uid })
        if (user == null) {
            return Result.fail(ClientError.NOT_FOUND(`UserPostgresRepository: findByUid(${uid})`))
        }
        return Result.ok(user)
    }
    async findByUserName(user_name: string): Promise<Result<User>> {
        const user = await this.repository.findOneBy({ user:user_name })
        if (user == null) {
            return Result.fail(ClientError.NOT_FOUND(`UserPostgresRepository: findByUserName(${user_name})`))

        }
        return Result.ok(user)
    }

    async updateUser(uid: string, userEssential: IUserEssential): Promise<Result<User>> {
        const user = await this.repository.findOneBy({ uid })

        if (!user){
            return Result.fail(ClientError.NOT_FOUND(`UserPostgresRepository: findByUserName(${uid})`))
        }

        const userUserName = await this.repository.findOneBy( { user:userEssential.user })
        if (userUserName && userUserName == user ){
            return Result.fail(ClientError.CONFLICT("Username already exists", `UserPostgresRepository: findByUserName(${userEssential.user})`))
        }
        
        user.email = userEssential.email || user.email
        user.name = userEssential.name || user.name
        user.user = userEssential.user || user.user

        const updatedUser = await this.repository.save(user)
        return Result.ok(updatedUser)
    }

    async delete(uid: string): Promise<Result<boolean>> {
        if (!(await this.repository.findOneBy({ uid }))){
            return Result.fail(ClientError.NOT_FOUND((`UserPostgresRepository: delete(${uid})`)))
        }
        const result = await this.repository.delete({uid})
        const boolResult = result.affected == null || (result.affected !== undefined && result.affected > 0)
        return Result.ok(boolResult)
    }
}