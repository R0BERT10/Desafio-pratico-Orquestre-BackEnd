import { Result } from "../../util/ResultClassHandle";
import User, { IUserEssential } from "../entities/User";

export default interface IUserRepository {
    createNewUser(user : User) : Promise<Result<User>>
    
    findByUid(uid : string) : Promise<Result<User>>
    findByUserName(user_name : string) : Promise<Result<User>>

    updateUser(uid : string, userEssential : IUserEssential) : Promise<Result<User>>
    
    delete(uid : string) : Promise<Result<boolean>>
}