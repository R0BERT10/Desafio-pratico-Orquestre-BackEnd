import { FindOptionsWhere } from "../../util/@Type.FindOptionsWhere"
import { Result } from "../../util/ResultClassHandle"
import Genre, { IGenreEssential } from "../entities/Genre"

export default interface IGenreRepository {
    createNewGenre(genre: Genre): Promise<Result<Genre>>

    findByGenreAttributes(genreAttributes: FindOptionsWhere<Genre>): Promise<Result<Genre>>

    getAllGenres(): Promise<Result<Genre[]>>

    updateGenre(id: number, genreEssential: IGenreEssential): Promise<Result<Genre>>

    delete(id: number): Promise<Result<boolean>>
}