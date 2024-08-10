import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class UpdateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    async handle(request: Request, response: Response) {
        const { uid } = request.params
        const userEssential = request.body

        const result = await this.userRepository.updateUser(uid, userEssential)

        return response.status(200).json(result)
    }
}