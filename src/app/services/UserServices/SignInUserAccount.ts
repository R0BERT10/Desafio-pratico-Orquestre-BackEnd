import IAuthProvider from "../../../providers/IAuthProvider";
import { Result } from "../../../util/ResultClassHandle";
import { ServerError } from "../../../util/ResultErrors";
import User from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

export default class SignInUserAccount {
    constructor(
        private userRepository: IUserRepository,
        private authProvider: IAuthProvider
    ) { }

    async execute(email: string, password: string): Promise<Result<User>> {
        try {
            const result = await this.authProvider.singInAccount({ email, password })
            if (result.isFailure) {
                return Result.fail(result.getError())
            }
            const { uid, idToken, refreshToken } = result.getValue()

            const userResult = await this.userRepository.findByUid(uid)
            if (userResult.isFailure) {
                return Result.fail(userResult.getError())
            }
            const user = userResult.getValue()
            user.idToken = idToken
            user.refreshToken = refreshToken
            return Result.ok(user)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`tokenError:${err.message}`, `SignInUserAccount: execute(${email}, ${password})`))
        }
    }
}