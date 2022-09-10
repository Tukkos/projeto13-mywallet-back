import express from "express";
import { signUp, signIn } from "../controllers/authController.js";
import userSchemaValidation from "../middlewares/userSchemaValidation.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    userSchemaValidation,
    signUp
);

authRouter.post("/", signIn);

export default authRouter;