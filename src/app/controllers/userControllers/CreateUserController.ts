import { Request, Response } from "express";
import { IUserEssential } from "../../entities/User";
import IUserRepository from "../../repositories/IUsersRepository";


export default class CreateUserController {
    constructor( private userRepository : IUserRepository ){
    }
    handle = async (req: Request, res: Response) => {
      const userEssential : IUserEssential = req.body
      console.log(userEssential) 
      const userRepository = this.userRepository
      
      const result = await userRepository.createNewUser(userEssential);

      if (result.isFailure){
        const err = result.getError()
        return res.status(err.httpCodeResponse).json({ ode:err.httpCodeResponse, message:err.messageResponse})
      }

      const user = result.getValue()
      return res.status(201).json(user);
    }
}
