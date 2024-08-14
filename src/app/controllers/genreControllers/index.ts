import { GenreServices } from "../../services/GenreServices";
import CreateGenreController from "./CreateGenreController";
import DeleteGenreController from "./DeleteGenreController";
import GetGenreController from "./GetGenreController";
import UpdateGenreController from "./UpdateGenreController";

const genreServices = GenreServices

export default function GenreControllers() {
    return {
        Get: new GetGenreController(genreServices.read),
        Post: new CreateGenreController(genreServices.create),
        Put: new UpdateGenreController(genreServices.update),
        Delete: new DeleteGenreController(genreServices.delete),
    }
}