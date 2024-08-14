import { Result } from "../../../util/ResultClassHandle"
import { ServerError } from "../../../util/ResultErrors"
import Genre, { IGenreEssential } from "../../entities/Genre"
import IGenreRepository from "../../repositories/IGenreRepository"


export default class UpdateGenreService {
    constructor(
        private userRepository: IGenreRepository
    ) { }

    async execute(id: number, data: IGenreEssential): Promise<Result<Genre>> {
        try {
            return await this.userRepository.updateGenre(id, data)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Update:${err.message}`, `UpdateGenreService: execute(${data})`))
        }
    }
}