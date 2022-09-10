import express from "express";
import { signUp, signIn } from "./controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", signUp);
authRouter.post("/", signIn);

export default authRouter;