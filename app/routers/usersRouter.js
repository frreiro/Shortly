import { Router } from "express";
import { sendUserData, usersRanking } from "../controllers/usersController.js";
import { tokenValidate } from "../middlewares/tokenMiddlewares.js";

const usersRouter = Router();

usersRouter.get('/users/:id', tokenValidate, sendUserData)
usersRouter.get('/ranking', usersRanking)

export default usersRouter;