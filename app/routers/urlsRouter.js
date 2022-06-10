import { Router } from "express";
import { deleteUrl, getUrlById, redirectUrl, shortUrl } from "../controllers/urlsController.js";
import { tokenValidate } from "../middlewares/tokenMiddlewares.js";
import { belongUser, idParamValidate, urlValidate } from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidate, tokenValidate, shortUrl)
urlsRouter.get('/urls/:id', idParamValidate, getUrlById)
urlsRouter.get('/urls/open/:shortUrl', redirectUrl)
urlsRouter.delete('/urls/:id', idParamValidate, tokenValidate, belongUser, deleteUrl)



export default urlsRouter;