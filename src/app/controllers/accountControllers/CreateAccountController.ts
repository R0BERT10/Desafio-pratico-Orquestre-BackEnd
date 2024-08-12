import { Request, Response } from "express";
import User, { IUserEssential } from "../../entities/User";
import CreateUserAccount from "../../Services/UserServices/CreateUserAccount";

interface BodyRequest extends IUserEssential {
  password:string
}

interface BodyResponse extends User {
}

export default class CreateAccountController {
  constructor(
    private createUser : CreateUserAccount
  ) { }

  handle = async (req: Request, res: Response) => {
      const bodyRequest : BodyRequest = req.body
      if (!this.isBodyValid(bodyRequest)){ return res.status(400).json({
        code:400, message:"Incorrect request: must contain name, user and email."
      })}

      const result = await this.createUser.execute(bodyRequest);

      if (result.isFailure){
        const err = result.getError()
        return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
      }

      const user : BodyResponse = result.getValue()
      return res.status(201).json(user);
    }

    private isBodyValid(obj: any): obj is BodyRequest {
      return typeof obj.user === 'string' &&
             typeof obj.name === 'string' &&
             typeof obj.email === 'string'
    }
}
