import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class UpdateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (req: Request, res: Response) => {
        const { uid } = req.params
        const userEssential = req.body

        const result = await this.userRepository.updateUser(uid, userEssential)

        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ ode:err.httpCodeResponse, message:err.messageResponse})
        }

        const user = result.getValue()
        return res.status(205).json(user)
    }
}