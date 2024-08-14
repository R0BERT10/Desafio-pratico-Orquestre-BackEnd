import IAuthProvider, { updatedToken } from "../../../providers/IAuthProvider";
import { Result } from "../../../util/ResultClassHandle";
import { ServerError } from "../../../util/ResultErrors";

export default class RefreshTokenAccount {
    constructor(
        private authProvider: IAuthProvider
    ) { }

    async execute(refreshToken: string): Promise<Result<updatedToken>> {
        try {
            return await this.authProvider.refreshToken(refreshToken)
        } catch (error) {
            const err = error as Error
            console.log(err.message)
            return Result.fail(ServerError.generic(`Update:${err.message}`, `RefreshTokenAccount: execute(${refreshToken})`))
        }
    }
}