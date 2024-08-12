import IAuthProvider from "../../../providers/IAuthProvider";
import AuthProviderFirebase from "../../../providers/implementation/AuthProviderFirebase";
import UserRepositoryPostgres from "../../repositories/implementations/UserRepositoryPostgres";
import IUserRepository from "../../repositories/IUsersRepository";
import CreateUserAccount from "./CreateUserAccount";
import DeleteUserAccount from "./DeleteUserAccount";
import SignInUserAccount from "./SignInUserAccount";
import UpdateUserAccount from "./UpdateUserAccount";

const repository : IUserRepository = new UserRepositoryPostgres()
const authProvider : IAuthProvider = new AuthProviderFirebase()

export const UserAccountServices = {
    createAccount : new CreateUserAccount(repository, authProvider), 
    deleteAccount : new DeleteUserAccount(repository, authProvider), 
    singInAccount : new SignInUserAccount(repository, authProvider), 
    UpdateAccount : new UpdateUserAccount(repository, authProvider), 
}