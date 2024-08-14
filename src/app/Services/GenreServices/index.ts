import CreateGenreService from "./CreateGenre";
import GetGenreService from "./GetGenre";
import UpdateGenreService from "./updateGenre";
import DeleteGenreService from "./DeleteGenre";
import IGenreRepository from "../../repositories/IGenreRepository";
import GenreRepositoryPostgres from "../../repositories/implementations/GenreRepositoryPostgres";

const repository : IGenreRepository = new GenreRepositoryPostgres()

export const GenreServices = {
    create : new CreateGenreService(repository), 
    read : new GetGenreService(repository), 
    update : new UpdateGenreService(repository),
    delete : new DeleteGenreService(repository), 
}