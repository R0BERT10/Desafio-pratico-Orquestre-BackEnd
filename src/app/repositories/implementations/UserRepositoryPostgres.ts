import { AppDataSource } from "../../../database/data-source";
import User, { IUserEssential } from "../../entities/User";
import IUserRepository from "../IUsersRepository";

export default class UserRepositoryPostgres implements IUserRepository {
    private repository = AppDataSource.getRepository(User)
    private authProvider = "EpeNsy3hJrgNwsQbGQv37YBzTK73"
    
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

    async updateUser(uid: string, userEssential: IUserEssential): Promise<User> {
        const user = await this.repository.findOneBy({ uid })

        if (!user){
            throw Error("User not found")
        }

        if (await this.repository.findOneBy( { user:userEssential.user })){
            throw Error("Username already exists")
        }
        user.email = userEssential.email || user.email
        user.name = userEssential.name || user.name
        user.user = userEssential.user || user.user

        return await this.repository.save(user)

    }
    async delete(uid: string): Promise<boolean> {
        if (!(await this.repository.findOneBy({ uid }))){
            throw Error("User not found")
        }

        const result = await this.repository.delete(uid)

        return result.affected == null || (result.affected !== undefined && result.affected > 0);
    }

}