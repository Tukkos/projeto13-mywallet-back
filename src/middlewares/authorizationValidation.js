import db from "../database/db.js"

async function authorizationValidation(req, res, next) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Problema de token");
    }

    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
        return res.status(401).send("Problema de sessao");
    };

    res.locals.session = session;
    next();
};

export default authorizationValidation;