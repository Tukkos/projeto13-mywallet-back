import db from "../database/db.js";

async function getTransactions (req, res) {
    try {
        const session = res.locals.session;

        const transactions = await db.collection("transactions").find({
            userId: session.userId
        }).toArray();
        res.status(201).send(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function createIncomeTransactions (req, res) {
    const { value, description, type, date } = req.body;

    try {
        const session = res.locals.session;

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
    const { value, description, type, date } = req.body;

    try {
        const session = res.locals.session;

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

async function updateTransactions(req, res) {
    const id = req.params.id;
    const { value, description, type } = req.body;

    try {
        const transaction = res.locals.transaction;

        await db.collection("transactions").updateOne({
            _id: transaction._id
            }, { $set: {
                    value: value,
                    description: description,
                    type: type
                }
            });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { getTransactions, createIncomeTransactions, createOutcomeTransactions, updateTransactions };