import joi from "joi";
import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function signUp(req, res) {
    const { name, email, password } = req.body;

    const validation = usersSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        const user = await db.collection("users").findOne({ email });
        if (user) {
            return res.status(409).send("Email já está em uso");
        };

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

async function signIn(req, res) {
    const {email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(409).send("Usuário não encontrado");
        };

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
    
            await db.collection("sessions").insertOne({ token, userId: user._id });
    
            res.send(token);
        } else {
            res.sendStatus(401);
        };
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { signUp, signIn };