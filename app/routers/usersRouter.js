import { Router } from "express";
import { getUserData, usersRanking } from "../controllers/usersController.js";
import { tokenValidate } from "../middlewares/tokenMiddlewares.js";

const usersRouter = Router();

usersRouter.get('/users/:id', tokenValidate, getUserData)
usersRouter.get('/ranking', usersRanking)

export default usersRouter;