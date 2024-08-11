import { Result } from "../../../util/ResultClassHandle";
import IUserRepository from "../../repositories/IUsersRepository";

export default class DeleteUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : string = ""
    ){ }

    async execute(uid:string) : Promise<Result<Boolean>> {
        return this.userRepository.delete(uid)
    }
}