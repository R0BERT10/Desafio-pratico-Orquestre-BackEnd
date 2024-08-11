import { Request, Response } from "express";
import DeleteUserAccount from "../../Services/UserServices/DeleteUserAccount";

interface BodyRequest {
    uid : string
}

export default class DeleteAccountController {
    constructor( private deleteAccount : DeleteUserAccount ){
    }
    handle = async (req: Request, res: Response) => {
        const { uid } = req.body as BodyRequest
        if (!this.isBodyValid(req.body)) {
            return res.status(400).json({code:400, message:"User uid required"})
        }
        const result = await this.deleteAccount.execute(uid)
        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }

        const isSuccessful = result.getValue()
        if (isSuccessful){
            return res.status(204).json()
        } else {
            return res.status(400).json({code:400, message:"No records were deleted."})
        }
    }

    private isBodyValid(obj: any): obj is BodyRequest {
        return typeof obj.uid === 'string'
      }
}