import { randomUUID } from "crypto";
import { Result } from "../../../util/ResultClassHandle";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

export default class CreateUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : string = ""
    ){ }

    async execute(data :IUserEssential) : Promise<Result<User>> {
        const user = new User()
        user.email = data.email
        user.name = data.name
        user.user = data.user //UserName
        user.idToken = "firebase"
        user.refreshToken = "firebase"
        user.uid = randomUUID().valueOf()
        return this.userRepository.createNewUser(user)
    }
}