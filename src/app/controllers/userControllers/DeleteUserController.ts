import { Request, Response } from "express";
import IUserRepository from "../../repositories/IUsersRepository";

export default class DeleteUserController {
    constructor( private userRepository : IUserRepository ){
    }
    async handle(request: Request, response: Response) {
        const { uid } = request.params

        const result = await this.userRepository.delete(uid)

        return response.status(200).json(result)
    }
}