import { FindOptionsWhere } from "../../util/@Type.FindOptionsWhere"
import { Result } from "../../util/ResultClassHandle"
import Movie, { IMovieEssential } from "../entities/Movie"

export default interface IMovieRepository {
    createNewGenre(user : Movie) : Promise<Result<Movie>>
    
    findByMovieAttributes(MovieAttributes : FindOptionsWhere<Movie>) : Promise<Result<Movie>>

    updateUser(id : string, MovieEssential : IMovieEssential) : Promise<Result<Movie>>
    
    delete(uid : string) : Promise<Result<boolean>>
}