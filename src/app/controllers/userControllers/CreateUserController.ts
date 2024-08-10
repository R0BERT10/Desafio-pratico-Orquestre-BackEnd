import { Request, Response } from "express";
import { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";


export default class CreateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    async handle(request: Request, response: Response) {
      const userEssential : IUserEssential = request.body
      const userRepository = this.userRepository
      
      const result = await userRepository.createNewUser(userEssential);

      return response.json(result);
    }
  }
  
  