import IAuthProvider from "../../../providers/IAuthProvider"
import AuthProviderFirebase from "../../../providers/implementation/AuthProviderFirebase"
import VerifyAuthToken from "./VerifyAuthToken"

const authProvider: IAuthProvider = new AuthProviderFirebase()

export const GlobalServices = {
    verifyIdToken: new VerifyAuthToken(authProvider)
}