import { randomUUID } from "crypto";
import { Result } from "../../../util/ResultClassHandle";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";
import IAuthProvider from "../../../providers/IAuthProvider";
import { ClientError, ServerError } from "../../../util/ResultErrors";

interface PropsDate extends IUserEssential {
    password:string
}

export default class CreateUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : IAuthProvider
    ){ }

    async execute(data :PropsDate) : Promise<Result<User>> {
        try {
            const isConflict = await this.checkExistOnDB(data.user, data.email)
            if (isConflict.isFailure){
                return Result.fail(isConflict.getError())
            }
            const result = await this.authProvider.singUpAccount({email:data.email, password:data.password})
            if (result.isFailure){
                return Result.fail(result.getError())
            }
            const userAuth = result.getValue()
            const user = new User()
            user.email = data.email
            user.name = data.name
            user.user = data.user //UserName
            user.uid = userAuth.uid
            const resultSave = await this.userRepository.createNewUser(user)
            if (resultSave.isFailure) { return Result.fail(resultSave.getError()) }
            user.idToken = userAuth.idToken
            user.refreshToken = userAuth.refreshToken
            return Result.ok(user)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`tokenError:${err.message}` ,`CreateUserAccount: execute(${data})`))
        }
    }

    async checkExistOnDB(user:string, email:string){
        const emailExist = (await this.userRepository.findByEmail(email)).isSuccess
        if (emailExist) { return Result.fail(ClientError.CONFLICT("Email already registered", `CreateUserAccount: checkExistOnDB(${email})`))}
        const userExist = (await this.userRepository.findByUserName(user)).isSuccess
        if (userExist) { return Result.fail(ClientError.CONFLICT("Username already exists", `CreateUserAccount: checkExistOnDB(${user})`))}
        
        return Result.ok()
    }
}