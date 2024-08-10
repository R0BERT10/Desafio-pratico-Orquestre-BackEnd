import { ResponseHTMLError } from "../../util/errorHandling";
import User, { IUserEssential } from "../entities/User";

export default interface IUserRepository {
    createNewUser(user : IUserEssential) : Promise<User>
    findByUid(uid : string) : Promise<User>
    findByUserName(user_name : string) : Promise<User>

    catchError() : ResponseHTMLError
}