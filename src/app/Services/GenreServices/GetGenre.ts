import { Result } from "../../../util/ResultClassHandle"
import { ClientError, ServerError } from "../../../util/ResultErrors"
import Genre from "../../entities/Genre"
import IGenreRepository from "../../repositories/IGenreRepository"

export default class GetGenreService {
    constructor(
        private repository : IGenreRepository
    ){ }

    async execute(idOrName:string|number) : Promise<Result<Genre>> {
        try {
            let genre : Genre
            if (typeof(idOrName) == "number"){
                const result = await this.repository.findByGenreAttributes({ id:idOrName })
                if (result.isFailure){
                    return Result.fail(result.getError())
                }
                genre = result.getValue()
            } else if (typeof(idOrName) == "string"){
                const result = await this.repository.findByGenreAttributes({ name:idOrName })
                if (result.isFailure){
                    return Result.fail(result.getError())
                }
                genre = result.getValue()
            } else {
                return Result.fail(ClientError.generic("Type incorrect", `GetGenreService: execute(${idOrName})`))
            }
            return Result.ok(genre)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`GetError:${err.message}` ,`GetGenreService: execute(${idOrName})`))
        }
    }
}