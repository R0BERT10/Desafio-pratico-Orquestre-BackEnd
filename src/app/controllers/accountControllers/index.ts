import { UserAccountServices } from "../../services/UserServices";
import CreateAccountController from "./CreateAccountController";
import DeleteAccountController from "./DeleteAccountController";
import GetAccountController from "./GetAccountController";
import RefreshTokenAccountController from "./RefreshTokenAccountController";
import UpdateAccountController from "./UpdateAccountController";

export default function createUserControllers() {
    return {
        CreateAccount: new CreateAccountController(UserAccountServices.createAccount),
        DeleteAccount: new DeleteAccountController(UserAccountServices.deleteAccount),
        GetAccount: new GetAccountController(UserAccountServices.singInAccount),
        UpdateAccount: new UpdateAccountController(UserAccountServices.updateAccount),
        RefreshTokenAccount: new RefreshTokenAccountController(UserAccountServices.refreshTokenAccount)
    }
}
