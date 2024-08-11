import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class DeleteUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (req: Request, res: Response) => {
        const { uid } = req.params

        const result = await this.userRepository.delete(uid)

        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ ode:err.httpCodeResponse, message:err.messageResponse})
        }

        const isSuccessful = result.getValue()
        if (isSuccessful){
            return res.status(204)
        } else {
            return res.status(400).json({ message:"No records were deleted."})
        }
    }
}