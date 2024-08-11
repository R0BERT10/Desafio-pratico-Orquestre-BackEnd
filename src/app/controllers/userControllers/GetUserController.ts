import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class GetUserController {
    constructor( private userRepository : IUserRepository ){
    }
    
    handle = async (req: Request, res: Response) => {
        const { uid } = req.params

        const result = await this.userRepository.findByUid(uid)

        return res.status(200).json(result)
    }
}