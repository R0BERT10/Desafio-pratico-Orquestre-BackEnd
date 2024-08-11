import { Result } from "../../util/resultClassHandle";
import User, { IUserEssential } from "../entities/User";

export default interface IUserRepository {
    createNewUser(user : IUserEssential) : Promise<Result<User>>
    
    findByUid(uid : string) : Promise<Result<User>>
    findByUserName(user_name : string) : Promise<Result<User>>

    updateUser(uid : string, userEssential : IUserEssential) : Promise<Result<User>>
    
    delete(uid : string) : Promise<Result<boolean>>
}