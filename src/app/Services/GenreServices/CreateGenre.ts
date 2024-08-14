import { Result } from "../../../util/ResultClassHandle"
import { ServerError } from "../../../util/ResultErrors"
import Genre, { IGenreEssential } from "../../entities/Genre"
import IGenreRepository from "../../repositories/IGenreRepository"

export default class CreateGenreService {
    constructor(
        private repository : IGenreRepository
    ){ }

    async execute(data :IGenreEssential) : Promise<Result<Genre>> {
        try {
            const genre = new Genre()
            genre.name = data.name
            return await this.repository.createNewGenre(genre)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Create:${err.message}` ,`CreateGenreService: execute(${data})`))
        }
    }
}