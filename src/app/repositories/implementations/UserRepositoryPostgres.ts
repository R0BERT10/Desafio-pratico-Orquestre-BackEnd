import { AppDataSource } from "../../../database/data-source";
import { ResponseHTMLError } from "../../../util/errorHandling";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../IUsersRepository";

export default class UserRepositoryPostgres implements IUserRepository {
    private repository = AppDataSource.getRepository(User)
    private authProvider = "EpeNsy3hJrgNwsQbGQv37YBzTK73"
    private responseHTML : ResponseHTMLError | undefined
    
    async createNewUser(user: IUserEssential): Promise<User> {
        if (await this.repository.findOneBy({ user:user.user })) {
            throw new Error("User name already exists");
        }
        const newUser = this.repository.create(user)
        newUser.uid = this.authProvider
        throw new Error("Falta implementação do auth.")
        return this.repository.save(newUser)
    }
    async findByUid(uid: string): Promise<User> {
        const user = await this.repository.findOneBy({ uid })
        if (user == null) {
            throw Error("User not found")
        }
        return user
    }
    async findByUserName(user_name: string): Promise<User> {
        const user = await this.repository.findOneBy({ user:user_name })
        if (user == null) {
            throw Error("User not found")
        }
        return user
    }

    catchError(): ResponseHTMLError {
        const responseHTML = this.responseHTML
        
        return responseHTML
    }
}