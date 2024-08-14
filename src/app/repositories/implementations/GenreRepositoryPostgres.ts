import { AppDataSource } from "../../../database/data-source";
import { FindOptionsWhere } from "../../../util/@Type.FindOptionsWhere";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import Genre, { IGenreEssential } from "../../entities/Genre";
import IGenreRepository from "../IGenreRepository";

export default class GenreRepositoryPostgres implements IGenreRepository {
    private repository = AppDataSource.getRepository(Genre)

    async createNewGenre(genre: Genre): Promise<Result<Genre>> {
        if (await this.repository.findOneBy({ name: genre.name })) {
            return Result.fail(ClientError.CONFLICT("Genre already exists in the database", `GenreRepositoryPostgres: createNewGenre(${genre})`))
        }
        genre.name = genre.name.toLowerCase()
        const newGenre = this.repository.create(genre)
        const result = await this.repository.save(newGenre)
        return Result.ok(result)

    }
    async findByGenreAttributes(genreAttributes: FindOptionsWhere<Genre>): Promise<Result<Genre>> {
        const genre = await this.repository.findOneBy(genreAttributes)
        if (genre == null) {
            return Result.fail(ClientError.NOT_FOUND(`GenreRepositoryPostgres: findByGenreAttributes(${genreAttributes})`))
        }
        return Result.ok(genre)
    }
    async updateGenre(id: number, genreEssential: IGenreEssential): Promise<Result<Genre>> {
        const genre = await this.repository.findOneBy({ id })

        if (!genre) {
            return Result.fail(ClientError.NOT_FOUND(`GenrePostgresRepository: updateGenre(${id})`))
        }

        genre.name = genreEssential.name.toLowerCase() || genre.name

        const updatedGenre = await this.repository.save(genre)
        return Result.ok(updatedGenre)
    }
    async delete(id: number): Promise<Result<boolean>> {
        if (!(await this.repository.findOneBy({ id }))) {
            return Result.fail(ClientError.NOT_FOUND((`GenrePostgresRepository: delete(${id})`)))
        }
        const result = await this.repository.delete({ id })
        const boolResult = result.affected == null || (result.affected !== undefined && result.affected > 0)
        return Result.ok(boolResult)
    }
}