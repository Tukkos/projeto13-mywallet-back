import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

async function signUp(req, res) {
    const { name, email, password } = req.body;

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
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            const session = {
                token,
                userId: user._id,
                name: user.name,
                lastStatus: Date.now()
            };

            await db.collection("sessions").insertOne(session);
            res.status(201).send(session);
        } else {
            res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { signUp, signIn };