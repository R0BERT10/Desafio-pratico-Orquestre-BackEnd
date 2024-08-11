import { Router } from "express";
import { extractColonFromUrlMiddleware, handleServerErrors } from "./rootMiddlewares";
import accountRouter from "./accountRouter";

const routes = Router();

routes.use(handleServerErrors)
routes.use(extractColonFromUrlMiddleware)
routes.use("/account", accountRouter);

export default routes