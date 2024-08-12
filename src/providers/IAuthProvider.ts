import { Result } from "../util/ResultClassHandle"

export type propsLogin = {
    email : string,
    password : string
}

export type userAuth = {
    uid:string,
    email:string,
    idToken:string,
    refreshToken:string
}

export default interface IAuthProvider {
    singUpAccount(props:propsLogin) : Promise<Result<userAuth>>
    singInAccount(props:propsLogin) : Promise<Result<userAuth>>
    DeleteAccount(uid:string) : Promise<Result<boolean>>
    verifyToken(idToken:string) : Promise<Result<boolean>>
    refreshToken(refreshToken:string) : Promise<Result<string>>
}