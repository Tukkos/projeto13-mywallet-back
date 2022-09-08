import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db("myWallet");
});

//joi Schemas ----------------------------------------------------------------------
const transactionSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required(),
        type: joi.string().required().valid("income", "outcome"),
        date: joi.string().required()
});

const usersSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required()
});



//Collection transactions ---------------------------------------------------------------------
app.post("/income", async (req, res) => {
    const { value, description, type, date } = req.body;

    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        await db.collection("transactions").insertOne({
                value,
                description,
                type,
                date
        });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
});

app.post("/outcome", async (req, res) => {
    const { value, description, type, date } = req.body;

    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    try {
        await db.collection("transactions").insertOne({
                value,
                description,
                type,
                date
        });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
});

app.listen(5000, () => console.log("Listen on http://localhost:5000"))