import { Request, Response } from "express";
import { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";


export default class CreateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (request: Request, response: Response) => {
      const userEssential : IUserEssential = request.body
      console.log(userEssential) 
      const userRepository = this.userRepository
      
      const result = await userRepository.createNewUser(userEssential);

      return response.json(result);
    }
  }
  
  