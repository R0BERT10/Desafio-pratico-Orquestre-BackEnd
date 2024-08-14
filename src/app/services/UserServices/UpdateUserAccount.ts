import IAuthProvider from "../../../providers/IAuthProvider";
import { Result } from "../../../util/ResultClassHandle";
import { ServerError } from "../../../util/ResultErrors";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

interface PropsDate extends IUserEssential {
    newPassword: string
}

export default class UpdateUserAccount {
    constructor(
        private userRepository: IUserRepository,
        private authProvider: IAuthProvider
    ) { }

    async execute(token: string, data: PropsDate): Promise<Result<User>> {
        try {
            const resultUid = await this.authProvider.verifyToken(token)
            if (resultUid.isFailure) {
                return Result.fail(resultUid.getError())
            }
            const uid = resultUid.getValue()
            if (data.newPassword != undefined) {
                const changePasswordResult = await this.authProvider.changePassword(token, data.newPassword)
                if (changePasswordResult.isFailure) {
                    return Result.fail(changePasswordResult.getError())
                }
            }
            const resultSave = await this.userRepository.updateUser(uid, data)
            return resultSave
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Update:${err.message}`, `UpdateUserAccount: execute(${data})`))
        }
    }
}