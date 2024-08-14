import CreateGenreService from "./CreateGenre";
import GetGenreService from "./GetGenre";
import UpdateGenreService from "./updateGenre";
import DeleteGenreService from "./DeleteGenre";
import IGenreRepository from "../../repositories/IGenreRepository";
import GenreRepositoryPostgres from "../../repositories/implementations/GenreRepositoryPostgres";
import GetAllGenreService from "./GetAllGenre";

const repository: IGenreRepository = new GenreRepositoryPostgres()

export const GenreServices = {
    create: new CreateGenreService(repository),
    read: new GetGenreService(repository),
    readAll: new GetAllGenreService(repository),
    update: new UpdateGenreService(repository),
    delete: new DeleteGenreService(repository),
}