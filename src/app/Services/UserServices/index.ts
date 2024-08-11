import UserRepositoryPostgres from "../../repositories/implementations/UserRepositoryPostgres";
import IUserRepository from "../../repositories/IUsersRepository";
import CreateUserAccount from "./CreateUserAccount";
import DeleteUserAccount from "./DeleteUserAccount";
import SignInUserAccount from "./SignInUserAccount";
import UpdateUserAccount from "./UpdateUserAccount";

const repository : IUserRepository = new UserRepositoryPostgres()

export const UserAccountServices = {
    createAccount : new CreateUserAccount(repository), 
    deleteAccount : new DeleteUserAccount(repository), 
    singInAccount : new SignInUserAccount(repository), 
    UpdateAccount : new UpdateUserAccount(repository), 
}