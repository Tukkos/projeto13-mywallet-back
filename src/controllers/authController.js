import joi from "joi";
import db from "../database/db.js";
import bcrypt from "bcrypt";

const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function createAccount(req, res) {
    const { name, email, password } = req.body;

    const validation = usersSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        const passwordHash = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: passwordHash
        });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { createAccount };