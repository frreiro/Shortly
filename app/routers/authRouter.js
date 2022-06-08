import { Router } from "express";
import { signup, signin } from "../controllers/authController.js";
import { encryptPassword, signinValidate, signupValidate, userValidate } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post('/signup', signupValidate, encryptPassword, signup)
authRouter.post('/signin', signinValidate, userValidate, signin)



export default authRouter;