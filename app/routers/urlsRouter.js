import { Router } from "express";
import { getUrl, shortUrl } from "../controllers/urlsController.js";
import { tokenValidate } from "../middlewares/tokenMiddlewares.js";
import { idParamValidate, urlValidate } from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidate, tokenValidate, shortUrl)
urlsRouter.get('/urls/:id', idParamValidate, getUrl)
urlsRouter.get('/urls/open/:shortUrl')
urlsRouter.delete('/urls/:id')



export default urlsRouter;