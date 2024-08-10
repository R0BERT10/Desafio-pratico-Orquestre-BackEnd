import { ResponseHTMLError } from "../../util/errorHandling";
import User, { IUserEssential } from "../entities/User";

export default interface IUserRepository {
    createNewUser(user : IUserEssential) : Promise<User>
    
    findByUid(uid : string) : Promise<User>
    findByUserName(user_name : string) : Promise<User>

    updateUser(uid : string, userEssential : IUserEssential) : Promise<User>
    
    delete(uid : string) : Promise<boolean>

}