import { Router } from "express";
import UserRepositoryPostgres from "../../repositories/implementations/UserRepositoryPostgres";
import IUserRepository from "../../repositories/IUsersRepository";
import createUserControllers from "../../controllers/userControllers";

const userRouter = Router();

const repository : IUserRepository = new UserRepositoryPostgres()

const userControllers = createUserControllers(repository)

userRouter.get("/:uid", userControllers.GetUser.handle);
userRouter.delete("/:uid", userControllers.DeleteUser.handle);
userRouter.post("/",  userControllers.CreateUser.handle);
userRouter.put("/:uid", userControllers.UpdateUse.handle);

export default userRouter