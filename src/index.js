import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionRouter.js";
import db from "./database/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(transactionsRouter);

setInterval(async() => {
    await db.collection("sessions").deleteMany({ lastStatus: { $lte: (Date.now() - 600000)}});
}, 300000);

app.listen(5000, () => console.log("Listen on http://localhost:5000"))