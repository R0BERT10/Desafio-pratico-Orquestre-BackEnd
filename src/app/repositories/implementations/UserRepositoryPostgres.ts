import { AppDataSource } from "../../../database/data-source";
import { FindOptionsWhere } from "../../../util/@Type.FindOptionsWhere";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../IUsersRepository";

export default class UserRepositoryPostgres implements IUserRepository {
    private repository = AppDataSource.getRepository(User)

    async createNewUser(user: User): Promise<Result<User>> {
        const checkResult = await this.checkUniqueValues(user.uid, user.email, user.user)
        if (checkResult.isFailure) {
            return Result.fail(checkResult.getError())
        }
        const newUser = this.repository.create(user)
        const result = await this.repository.save(newUser)
        return Result.ok(result)
    }
    async findByUid(uid: string): Promise<Result<User>> {
        return await this.findByUserAttributes({ uid })
    }
    async findByUserName(user_name: string): Promise<Result<User>> {
        return await this.findByUserAttributes({ user: user_name })
    }
    async findByEmail(email: string): Promise<Result<User>> {
        return await this.findByUserAttributes({ email })
    }
    async findByUserAttributes(userAttributes: FindOptionsWhere<User>): Promise<Result<User>> {
        const user = await this.repository.findOneBy(userAttributes)
        if (user == null) {
            return Result.fail(ClientError.NOT_FOUND(`UserPostgresRepository: findByUserAttributes(${userAttributes})`))
        }
        return Result.ok(user)
    }

    async updateUser(uid: string, userEssential: IUserEssential): Promise<Result<User>> {
        const user = await this.repository.findOneBy({ uid })

        if (!user) {
            return Result.fail(ClientError.NOT_FOUND(`UserPostgresRepository: findByUserName(${uid})`))
        }

        const userUserName = await this.repository.findOneBy({ user: userEssential.user })
        if (userUserName && userUserName == user) {
            return Result.fail(ClientError.CONFLICT("Username already exists", `UserPostgresRepository: findByUserName(${userEssential.user})`))
        }

        user.name = userEssential.name || user.name
        user.user = userEssential.user || user.user

        const updatedUser = await this.repository.save(user)
        return Result.ok(updatedUser)
    }

    async delete(uid: string): Promise<Result<boolean>> {
        if (!(await this.repository.findOneBy({ uid }))) {
            return Result.fail(ClientError.NOT_FOUND((`UserPostgresRepository: delete(${uid})`)))
        }
        const result = await this.repository.delete({ uid })
        const boolResult = result.affected == null || (result.affected !== undefined && result.affected > 0)
        return Result.ok(boolResult)
    }


    private async checkUniqueValues(uid: string, email: string, user: string) {
        if (await this.repository.findOneBy({ uid: uid })) {
            return Result.fail(ClientError.CONFLICT("Uid already exists in the database", `UserPostgresRepository: createNewUser(${user})`))
        }
        if (await this.repository.findOneBy({ email: email })) {
            return Result.fail(ClientError.CONFLICT("Email already registered", `UserPostgresRepository: createNewUser(${user})`))
        }
        if (await this.repository.findOneBy({ user: user })) {
            return Result.fail(ClientError.CONFLICT("Username already exists", `UserPostgresRepository: createNewUser(${user})`))
        }
        return Result.ok()
    }
}