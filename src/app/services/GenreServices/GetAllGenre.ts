import { Result } from "../../../util/ResultClassHandle"
import { ServerError } from "../../../util/ResultErrors"
import Genre from "../../entities/Genre"
import IGenreRepository from "../../repositories/IGenreRepository"

export default class GetAllGenreService {
    constructor(
        private repository: IGenreRepository
    ) { }

    async execute(): Promise<Result<Genre[]>> {
        try {
            return await this.repository.getAllGenres()
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`GetError:${err.message}`, `GetAllGenreService: execute()`))
        }
    }
}