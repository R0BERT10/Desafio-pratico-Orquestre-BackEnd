import IAuthProvider, { propsLogin, userAuth } from "../IAuthProvider";
import { Result } from "../../util/ResultClassHandle";
import { firebase, firebaseLinks } from "./Firebase";
import { options } from "../../util/CreateOptionsForFetch";
import { ClientError } from "../../util/ResultErrors";

export default class AuthProviderFirebase implements IAuthProvider {
    private auth = firebase.auth()//getAuth()    
    async singUpAccount({email, password}: propsLogin): Promise<Result<userAuth>> {
        const response = await (await fetch(firebaseLinks.signUp, options.POST({email, password})))
        const responseJson = await response.json()
        if (response.ok){
            const { localId, idToken, refreshToken } = responseJson
            return Result.ok<userAuth>({uid:localId, email, idToken, refreshToken})
        }
        return Result.fail(ClientError.generic(`authError:${responseJson.error.message}`, `AuthProviderFirebase: singUpAccount({${email}, ${password}})`))
    }
    async singInAccount({email, password}: propsLogin): Promise<Result<userAuth>> {
        const response = await (await fetch(firebaseLinks.signInWithPassword, options.POST({email, password, returnSecureToken:true})))
        const responseJson = await response.json()
        if (response.ok){
            const { localId, idToken, refreshToken } = responseJson
            return Result.ok<userAuth>({uid:localId, email, idToken, refreshToken})
        }
        return Result.fail(ClientError.generic(`authError:${responseJson.error.message}`, `AuthProviderFirebase: singInAccount({${email}, ${password}})`))
    }
    
    async deleteAccount(uid: string): Promise<Result<boolean>> {
        try {
            this.auth.deleteUser(uid)
            return Result.ok(true)
        } catch (error) {
            const err = error as Error
            return Result.fail(ClientError.generic(`deleteError:${err.message}` ,`AuthProviderFirebase: deleteAccount(${uid})`))
        }
    }
    async verifyToken(idToken: string): Promise<Result<string>> {
        try {
            const decodedIdToken = await this.auth.verifyIdToken(idToken, true)
            if (decodedIdToken.uid){
                return Result.ok(decodedIdToken.uid)
            }
            return Result.fail(ClientError.UNAUTHORIZED(`AuthProviderFirebase: verifyToken(${idToken})`))
        } catch(error) {
            const err = error as Error
            return Result.fail(ClientError.generic(`tokenError:${err.message}` ,`AuthProviderFirebase: verifyToken(${idToken})`))
        }
    }

    refreshToken(refreshToken: string): Promise<Result<string>> {
        throw new Error("Method not implemented.");
    }

    async changePassword(idToken: string, newPassword: string): Promise<Result<void>> {
        const response = await (await fetch(firebaseLinks.update, options.POST({idToken, password:newPassword, returnSecureToken:true})))
        const responseJson = await response.json()
        console.log(responseJson)
        if (response.ok){
            const { localId, idToken, refreshToken } = responseJson
            //return Result.ok<userAuth>({uid:localId, email, idToken, refreshToken})
        }
        //return Result.fail(ClientError.generic(`authError:${responseJson.error.message}`, `AuthProviderFirebase: singInAccount({${email}, ${password}})`))
        throw new Error("Method not implemented.");
    }
}
