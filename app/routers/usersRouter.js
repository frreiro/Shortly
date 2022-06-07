import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/users/:id')
usersRouter.post('/users/ranking')



export default usersRouter;