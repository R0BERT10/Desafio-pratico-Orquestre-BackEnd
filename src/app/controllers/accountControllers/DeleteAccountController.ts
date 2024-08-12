import { Request, Response } from "express";
import DeleteUserAccount from "../../Services/UserServices/DeleteUserAccount";


export default class DeleteAccountController {
    constructor( private deleteAccount : DeleteUserAccount ){
    }
    handle = async (req: Request, res: Response) => {
        const { token } = req.query
        if (token == undefined) {
            return res.status(400).json({code:400, message:"Query token is required"})
        }
        if (typeof(token) != "string"){
            console.log(token)
            return res.status(400).json({code:400, message:"Bad request"})
        }
        const result = await this.deleteAccount.execute(token)
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
}