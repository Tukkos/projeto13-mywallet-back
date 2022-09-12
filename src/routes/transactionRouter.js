import express from "express";
import { getTransactions, createIncomeTransactions, createOutcomeTransactions, updateTransactions } from "../controllers/transactionsController.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";
import transactionSchemaValidation from "../middlewares/transactionSchemaValidation.js";
import findTransaction from "../middlewares/findTransaction.js";

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

transactionsRouter.put(
    `/editTransaction/:id`,
    transactionSchemaValidation,
    authorizationValidation,
    findTransaction,
    updateTransactions
);

export default transactionsRouter;