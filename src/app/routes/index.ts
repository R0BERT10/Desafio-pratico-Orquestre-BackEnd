import { Router } from "express";
import userRouter from "./userRouter";
import { handleServerErrors } from "./handleServerErrors";

const routes = Router();

routes.use(handleServerErrors)
routes.use("/user", userRouter);

export default routes