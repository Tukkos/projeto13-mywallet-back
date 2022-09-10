import joi from "joi";

const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
});

async function userSchemaValidation(req, res, next) {
    const validation = usersSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };

    next();
};

export default userSchemaValidation;