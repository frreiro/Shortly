import express from "express";
import dotenv from "dotenv"
import authRouter from "./routers/authRouter.js";
import urlsRouter from "./routers/urlsRouter.js";
import usersRouter from "./routers/usersRouter.js";


dotenv.config();

const app = express();
app.use(authRouter);
app.use(urlsRouter)
app.use(usersRouter)





const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})