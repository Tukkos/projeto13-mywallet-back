import express from "express";
import { getTransactions, createIncomeTransactions, createOutcomeTransactions } from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/home", getTransactions);
transactionsRouter.post("/income", createIncomeTransactions);
transactionsRouter.post("/outcome", createOutcomeTransactions);

export default transactionsRouter;