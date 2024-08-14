import { Router } from "express";
import { extractColonFromUrlMiddleware, handleServerErrors } from "./rootMiddlewares";
import accountRouter from "./accountRouter";
import genreRouter from "./genreRouter";

const routes = Router();

routes.use(handleServerErrors)
routes.use(extractColonFromUrlMiddleware)
routes.use("/account", accountRouter)
routes.use("/genre", genreRouter)

export default routes