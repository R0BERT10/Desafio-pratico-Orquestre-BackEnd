import { Router } from "express";
import createUserControllers from "../../controllers/accountControllers";

const accountRouter = Router();

const userControllers = createUserControllers()

enum enumAccountMethods {
    SIGN_UP = "signUp",
    SIGN_IN_WITH_EMAIL_AND_PASSWORD = "signInWithEmailAndPassword",
    DELETE_PROFILE = "deleteProfile",
    UPDATE_PROFILE = "updateProfile",
    REFRESH_TOKEN = "refresh"
} 

const getUrlWithAccountMethods = (enumAccountMethods : enumAccountMethods) => {return "/internal"+enumAccountMethods}

accountRouter.post(getUrlWithAccountMethods(enumAccountMethods.SIGN_UP), userControllers.CreateAccount.handle)
accountRouter.post(getUrlWithAccountMethods(enumAccountMethods.SIGN_IN_WITH_EMAIL_AND_PASSWORD), userControllers.GetAccount.handle)
accountRouter.post(getUrlWithAccountMethods(enumAccountMethods.DELETE_PROFILE), userControllers.DeleteAccount.handle)
accountRouter.post(getUrlWithAccountMethods(enumAccountMethods.UPDATE_PROFILE), userControllers.UpdateAccount.handle)
accountRouter.post(getUrlWithAccountMethods(enumAccountMethods.REFRESH_TOKEN), userControllers.RefreshTokenAccount.handle)

export default accountRouter