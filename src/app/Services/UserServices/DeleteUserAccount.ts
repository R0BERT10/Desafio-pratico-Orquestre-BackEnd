import IAuthProvider from "../../../providers/IAuthProvider";
import { Result } from "../../../util/ResultClassHandle";
import { ServerError } from "../../../util/ResultErrors";
import IUserRepository from "../../repositories/IUsersRepository";

export default class DeleteUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : IAuthProvider
    ){ }

    async execute(token:string) : Promise<Result<Boolean>> {
        try {
            const resultUid = await this.authProvider.verifyToken(token)
            if (resultUid.isFailure){
                return Result.fail(resultUid.getError())
            }
            const uid = resultUid.getValue()
            const result = await this.authProvider.deleteAccount(uid)
            if (result.isFailure){
                return Result.fail(result.getError())
            }
            return await this.userRepository.delete(uid)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`tokenError:${err.message}` ,`DeleteUserAccount: execute(${token})`))
        }
    }
}