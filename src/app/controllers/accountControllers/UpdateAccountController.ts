import { Request, Response } from "express";
import User, { IUserEssential } from "../../entities/User";
import UpdateUserAccount from "../../Services/UserServices/UpdateUserAccount";

interface BodyRequest extends IUserEssential {
    password:string
}

interface BodyResponse extends User {
}

export default class UpdateAccountController {
    constructor( private updateAccount : UpdateUserAccount ){
    }
    handle = async (req: Request, res: Response) => {
        const { token } = req.query
        const bodyRequest : BodyRequest = req.body
        if (token == undefined) {
            return res.status(400).json({code:400, message:"Query token is required"})
        }
        if (typeof(token) != "string"){
            console.log(token)
            return res.status(400).json({code:400, message:"Bad request"})
        }
          
        const result = await this.updateAccount.execute(token, bodyRequest)

        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }

        const user : BodyResponse = result.getValue()
        return res.status(200).json(user)
    }
}