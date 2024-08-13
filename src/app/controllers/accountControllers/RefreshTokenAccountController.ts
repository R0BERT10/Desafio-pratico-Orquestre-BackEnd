import { Request, Response } from "express";
import RefreshTokenAccount from "../../Services/UserServices/RefreshTokenAccount";
import { updatedToken } from "../../../providers/IAuthProvider";

interface BodyRequest {
    refreshToken: string
}

interface BodyResponse extends updatedToken {
}

export default class RefreshTokenAccountController {
    constructor(
        private refreshTokenAcc : RefreshTokenAccount
    ) { }

    handle = async (req: Request, res: Response) => {
        const { refreshToken }: BodyRequest = req.body
        if (refreshToken == undefined) {
            return res.status(400).json({code:400, message:"refreshToken is required"})
        }
        if (typeof(refreshToken) != "string"){
            console.log(refreshToken)
            return res.status(400).json({code:400, message:"Bad request"})
        }

        const result = await this.refreshTokenAcc.execute(refreshToken)

        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }

        const bodyResponse : BodyResponse = result.getValue()
        return res.status(200).json(bodyResponse)
    }
}