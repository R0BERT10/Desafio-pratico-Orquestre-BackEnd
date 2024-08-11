import { Result } from "../../../util/ResultClassHandle";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

export default class UpdateUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : string = ""
    ){ }

    async execute(uid:string, data :IUserEssential) : Promise<Result<User>> {
        
        return this.userRepository.updateUser(uid, data)
    }
}