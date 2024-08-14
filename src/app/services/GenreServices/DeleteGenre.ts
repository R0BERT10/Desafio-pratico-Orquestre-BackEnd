import { Result } from "../../../util/ResultClassHandle"
import { ServerError } from "../../../util/ResultErrors"
import IGenreRepository from "../../repositories/IGenreRepository"

export default class DeleteGenreService {
    constructor(
        private repository: IGenreRepository
    ) { }

    async execute(id: number): Promise<Result<boolean>> {
        try {
            return await this.repository.delete(id)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`deleteError:${err.message}`, `DeleteGenreService: execute(${id})`))
        }
    }
}