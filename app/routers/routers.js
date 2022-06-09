import express from "express";
import authRouter from "./authRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";

const routes = express();

routes.use(authRouter);
routes.use(urlsRouter)
routes.use(usersRouter)


export default routes;