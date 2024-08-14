import { Request, Response } from "express";
import User from "../../entities/User";
import SignInUserAccount from "../../services/UserServices/SignInUserAccount";

interface BodyRequest {
    email: string
    password: string
}

interface BodyResponse extends User {
}

export default class GetAccountController {
    constructor(private getAccount: SignInUserAccount) {
    }

    handle = async (req: Request, res: Response) => {
        const { email, password } = req.body as BodyRequest
        if (!this.isBodyValid(req.body)) {
            return res.status(400).json({
                code: 400, message: "Incorrect request: must contain email and password"
            })
        }

        const result = await this.getAccount.execute(email, password)

        if (result.isFailure) {
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ code: err.httpCodeResponse, message: err.messageResponse })
        }

        const user: BodyResponse = result.getValue()
        return res.status(200).json(user)
    }

    private isBodyValid(obj: any): obj is BodyRequest {
        return typeof obj.email === 'string' && typeof obj.password === "string"
    }
}