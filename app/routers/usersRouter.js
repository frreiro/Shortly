import { Router } from "express";
import { getUserData } from "../controllers/usersController.js";
import { tokenValidate } from "../middlewares/tokenMiddlewares.js";

const usersRouter = Router();

usersRouter.get('/users/:id', tokenValidate, getUserData)
usersRouter.get('/ranking')



export default usersRouter;