import express from "express";
import cors from "cors";

import { getTransactions, createIncomeTransactions, createOutcomeTransactions } from "./controllers/transactionsController.js";
import authRouter from "./routes/authRouter.js";


const app = express();
app.use(cors());
app.use(express.json());app.use(authRouter);

//Collection transactions ---------------------------------------------------------------------
app.get("/home", getTransactions);
app.post("/income", createIncomeTransactions);
app.post("/outcome", createOutcomeTransactions);

app.listen(5000, () => console.log("Listen on http://localhost:5000"))