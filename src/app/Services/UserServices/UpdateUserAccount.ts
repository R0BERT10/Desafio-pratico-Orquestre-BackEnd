import IAuthProvider from "../../../providers/IAuthProvider";
import { Result } from "../../../util/ResultClassHandle";
import { ServerError } from "../../../util/ResultErrors";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

interface PropsDate extends IUserEssential {
    password:string
}

export default class UpdateUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : IAuthProvider
    ){ }

    async execute(token:string, data :PropsDate) : Promise<Result<User>> {
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
            if ( data.password != undefined ) {
            // Todo: alterar senha
            }
            return await this.userRepository.updateUser(uid, data)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`tokenError:${err.message}` ,`UpdateUserAccount: execute(${data})`))
        }
    }
}