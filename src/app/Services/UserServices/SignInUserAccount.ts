import { Result } from "../../../util/ResultClassHandle";
import User from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";

export default class SignInUserAccount {
    constructor(
        private userRepository : IUserRepository,
        private authProvider : string = ""
    ){ }

    async execute(email:string, password:string) : Promise<Result<User>> {
        const uid = "EpeNsy3hJrgNwsQbGQv37YBzTK73"
        return this.userRepository.findByUid(uid)
    }
}