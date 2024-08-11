import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class UpdateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (req: Request, res: Response) => {
        const { uid } = req.params
        const userEssential = req.body

        const result = await this.userRepository.updateUser(uid, userEssential)

        return res.status(200).json(result)
    }
}