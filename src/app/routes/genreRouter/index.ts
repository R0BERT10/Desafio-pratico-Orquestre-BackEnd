import { Router } from "express";
import GenreControllers from "../../controllers/genreControllers";

const genreRouter = Router();

const genreControllers = GenreControllers()
genreRouter.get("/:idOrName", genreControllers.Get.handle);
genreRouter.get("/", genreControllers.GetAll.handle)
genreRouter.post("/", genreControllers.Post.handle);
genreRouter.put("/:id", genreControllers.Put.handle);
genreRouter.delete("/:id", genreControllers.Delete.handle);

export default genreRouter