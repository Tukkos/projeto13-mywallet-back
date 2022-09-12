import db from "../database/db.js";
import { ObjectId } from "mongodb";

async function findTransaction(req, res, next) {
    const id = req.params;

    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!transaction) {
        return res.sendStatus(404);
    };
    
    res.locals.transaction = transaction;
    next();
};

export default findTransaction;