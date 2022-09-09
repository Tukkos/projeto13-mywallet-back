import joi from "joi";
import db from "../database/db.js";

const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

export {};