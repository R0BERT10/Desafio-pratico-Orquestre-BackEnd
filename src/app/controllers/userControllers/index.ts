import IUserRepository from "../../repositories/IUsersRepository";
import CreateUserController from "./CreateUserController";
import DeleteUserController from "./DeleteUserController";
import GetUserController from "./GetUserController";
import UpdateUserController from "./UpdateUserController";

export default function createUserControllers( userRepository : IUserRepository){
    return {
        CreateUser: new CreateUserController(userRepository),
        DeleteUser: new DeleteUserController(userRepository),
        GetUser : new GetUserController(userRepository),
        UpdateUse : new UpdateUserController(userRepository)
    }
}
