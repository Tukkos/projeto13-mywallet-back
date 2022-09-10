import joi from "joi";
import db from "../database/db.js";

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required().valid("income", "outcome"),
    date: joi.string().required()
});

async function getTransactions (req, res) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        };

        const userId = session.userId;
        console.log(userId);

        const transactions = await db.collection("transactions").find({
            userId: userId
        }).toArray();
        res.send(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function createIncomeTransactions (req, res) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    const { value, description, type, date } = req.body;
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        };

        await db.collection("transactions").insertOne({
                userId: session.userId,
                value,
                description,
                type,
                date
        });

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function createOutcomeTransactions (req, res) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    const { value, description, type, date } = req.body;
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        };

        await db.collection("transactions").insertOne({
                userId: session.userId,
                value,
                description,
                type,
                date
        });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { getTransactions, createIncomeTransactions, createOutcomeTransactions };