import { Request, Response } from "express";
import DeleteUserAccount from "../../services/UserServices/DeleteUserAccount";

interface BodyRequest {
    idToken: string
}

export default class DeleteAccountController {
    constructor(private deleteAccount: DeleteUserAccount) {
    }
    handle = async (req: Request, res: Response) => {
        const { idToken } = req.body as BodyRequest
        if (idToken == undefined) {
            return res.status(400).json({ code: 400, message: "idToken is required" })
        }
        if (typeof (idToken) != "string") {
            return res.status(400).json({ code: 400, message: "Bad request" })
        }
        const result = await this.deleteAccount.execute(idToken)
        if (result.isFailure) {
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ code: err.httpCodeResponse, message: err.messageResponse })
        }

        const isSuccessful = result.getValue()
        if (isSuccessful) {
            return res.status(204).json()
        } else {
            return res.status(400).json({ code: 400, message: "No records were deleted." })
        }
    }
}