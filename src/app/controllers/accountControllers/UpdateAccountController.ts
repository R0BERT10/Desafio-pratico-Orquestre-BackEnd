import { Request, Response } from "express";
import User, { IUserEssential } from "../../entities/User";
import UpdateUserAccount from "../../Services/UserServices/UpdateUserAccount";

interface BodyRequest extends IUserEssential {
    uid : string
}

interface BodyResponse extends User {
}

export default class UpdateAccountController {
    constructor( private updateAccount : UpdateUserAccount ){
    }
    handle = async (req: Request, res: Response) => {
        const bodyRequest : BodyRequest = req.body
        if (!this.isBodyValid(bodyRequest)){ return res.status(400).json({
            code:400, message:"Incorrect request: must contain uid"
          })}
          
        const result = await this.updateAccount.execute(bodyRequest.uid, bodyRequest)

        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }

        const user : BodyResponse = result.getValue()
        return res.status(200).json(user)
    }

    private isBodyValid(obj: any): obj is BodyRequest {
        return typeof obj.uid === 'string'
    }
}