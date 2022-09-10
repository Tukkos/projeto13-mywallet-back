import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(transactionsRouter);

app.listen(5000, () => console.log("Listen on http://localhost:5000"))