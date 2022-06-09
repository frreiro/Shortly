import express from "express";
import dotenv from "dotenv"
import routes from "./routers/routers.js";

dotenv.config();

const app = express();
app.use(express.json())

app.use(routes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})