import { Router } from "express";
import GenreControllers from "../../controllers/genreControllers";
import { verifyTokenMiddleware } from "../genreMiddlewares";

const genreRouter = Router();

const genreControllers = GenreControllers()
genreRouter.use("/", verifyTokenMiddleware)
genreRouter.get("/:idOrName", genreControllers.Get.handle);
genreRouter.post("/",  genreControllers.Post.handle);
genreRouter.put("/:id", genreControllers.Put.handle);
genreRouter.delete("/:id", genreControllers.Delete.handle);

export default genreRouter