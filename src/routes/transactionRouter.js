import express from "express";
import { getTransactions, createIncomeTransactions, createOutcomeTransactions } from "../controllers/transactionsController.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";
import transactionSchemaValidation from "../middlewares/transactionSchemaValidation.js";

const transactionsRouter = express.Router();

transactionsRouter.get(
    "/home",
    authorizationValidation,
    getTransactions
);

transactionsRouter.post(
    "/income",
    transactionSchemaValidation,
    authorizationValidation,
    createIncomeTransactions
);

transactionsRouter.post(
    "/outcome",
    transactionSchemaValidation,
    authorizationValidation,
    createOutcomeTransactions
);

export default transactionsRouter;