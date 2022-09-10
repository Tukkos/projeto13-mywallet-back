import joi from "joi";

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required().valid("income", "outcome"),
    date: joi.string().required()
});

async function transactionSchemaValidation(req, res, next) {
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    next();
};

export default transactionSchemaValidation;