import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class GetUserController {
    constructor( private userRepository : IUserRepository ){
    }
    
    handle = async (request: Request, response: Response) => {
        const { uid } = request.params

        const result = await this.userRepository.findByUid(uid)

        return response.status(200).json(result)
    }
}