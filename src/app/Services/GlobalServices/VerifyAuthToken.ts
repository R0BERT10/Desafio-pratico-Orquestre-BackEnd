import IAuthProvider from "../../../providers/IAuthProvider"
import { Result } from "../../../util/ResultClassHandle";

export default class VerifyAuthToken {
    constructor(
        private authProvider: IAuthProvider
    ) { }

    async execute(idToken: string): Promise<Result<boolean>> {
        const resultUid = await this.authProvider.verifyToken(idToken)
        if (resultUid.isFailure) {
            return Result.fail(resultUid.getError())
        }
        return Result.ok(true)
    }
}