import { Request, Response } from "express";
import User, { IUserEssential } from "../../entities/User";
import UpdateUserAccount from "../../services/UserServices/UpdateUserAccount";

interface BodyRequest extends IUserEssential {
    newPassword: string,
    idToken: string
}

interface BodyResponse {
    uid: string,
    user: string,
    name: string,
    email: string,
}

export default class UpdateAccountController {
    constructor(private updateAccount: UpdateUserAccount) {
    }
    handle = async (req: Request, res: Response) => {
        const { idToken } = req.body as BodyRequest
        const bodyRequest: BodyRequest = req.body
        if (idToken == undefined) {
            return res.status(400).json({ code: 400, message: "idToken is required" })
        }
        if (typeof (idToken) != "string") {
            return res.status(400).json({ code: 400, message: "Bad request" })
        }

        const result = await this.updateAccount.execute(idToken, bodyRequest)

        if (result.isFailure) {
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ code: err.httpCodeResponse, message: err.messageResponse })
        }

        const { uid, user, name, email } = result.getValue()
        const bodyResponse: BodyResponse = { uid, user, name, email }
        return res.status(200).json(bodyResponse)
    }
}