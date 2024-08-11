import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class DeleteUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (req: Request, res: Response) => {
        const { uid } = req.params

        const result = await this.userRepository.delete(uid)

        return res.status(200).json(result)
    }
}